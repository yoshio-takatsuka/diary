const { isNull } = require('@angular/compiler/src/output/output_ast')
const express = require('express')
const router = express.Router()
const Kakeibo = require('../model/kakeibo')     // 家計簿モデル
const KakeiboFrom = require('../model/kakeiboFrom')     // 家計簿モデル

// ----------------------------------------
// 指定日のデータ取得
// ----------------------------------------
router.get('/:p_date', function (req, res) {
  const p_date = req.params.p_date
  // 家計簿情報（集計）
  // Step1 口座の種別を取得
  // Step2 口座の残高を取得
  // Step3 今日までの残高を計算

  // 家計簿情報（当日明細）
  Kakeibo.find({ p_date: p_date }, { _id: 0, p_date: 0, No: 0, __v: 0 }, function (err, foundKakeibo) {
    if (err) {
      return res.status(422).send({ errors: [{ title: 'Kakeibo error', detail: 'Kakeibo not found!' }] })
    }
    //  返却エリアを定義
    let KakeiboSend = {
      p_date: Object,
      kakeibos: []
    }
    // console.log(JSON.stringify(foundKakeibo, null, 2));
    if (foundKakeibo === null) {
      return res.json("")
    } else {
      KakeiboSend.p_date = p_date
      for (let i = 0; i < foundKakeibo.length; i++) {
        KakeiboSend.kakeibos.push(foundKakeibo[i])
      }
      // console.log(JSON.stringify(KakeiboSend, null, 2));
      return res.json(KakeiboSend)
    }
  })
})

// ----------------------------------------
// データ登録
// ----------------------------------------
router.post('/register', function (req, res) {
  // console.log(JSON.stringify(req.body, null, 2));

  if (!req.body.p_date) {
    return res.status(422).send({ errors: [{ title: 'Input error', detail: '日付を入力してください！' }] })
  }
  // 指定日付データを削除し、今回データ追加
  Kakeibo.deleteMany({ "p_date": req.body.p_date }, function (err) {
    if (err) {
      // console.log(JSON.stringify(err, null, 2));
    }
    kakeibos = new Array()
    req.body.kakeibos.forEach(function (item, index) {
      kakeibo = new Kakeibo()
      kakeibo.p_date = req.body.p_date
      kakeibo.No = index + 1
      kakeibo.kakeiboTime = item.kakeiboTime
      kakeibo.kakeiboKamoku = item.kakeiboKamoku
      kakeibo.kakeiboDetail = item.kakeiboDetail
      kakeibo.kakeiboPayKbn = item.kakeiboPayKbn
      kakeibo.kakeiboKingaku = item.kakeiboKingaku
      kakeibos.push(kakeibo)

    });

    console.log(JSON.stringify(kakeibos, null, 2));
    Kakeibo.insertMany(kakeibos, (err) => {
      if (err) {
        return res.status(422).send({ errors: [{ title: 'User error', detail: 'Someting went wrong!' }] })
      }
      return res.json({ "registerd": true })
    })
  })

})



module.exports = router;
