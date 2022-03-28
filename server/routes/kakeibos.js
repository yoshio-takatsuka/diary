const { isNull } = require('@angular/compiler/src/output/output_ast')
const express = require('express')
const kakeibo = require('../model/kakeibo')
const router = express.Router()
const Kakeibo = require('../model/kakeibo')     // 家計簿モデル



// 指定日のデータ取得
router.get('/:p_date', function (req, res) {

  const p_date = req.params.p_date

  // 家計簿情報（集計）
  // Step1 口座の種別を取得
  // Step2 口座の残高を取得
  // Step3 今日までの残高を計算

  // 家計簿情報（当日明細）
  Kakeibo.findOne({p_date: p_date }, function (err, foundKakeibo) {
    if (err) {
      return res.status(422).send({ errors: [{ title: 'Kakeibo error', detail: 'Kakeibo not found!' }] })
    }
    // console.log(JSON.stringify(foundKakeibo, null, 2));
    if (foundKakeibo === null) {
      return res.json("")
    } else {
      return res.json(foundKakeibo)
    }
  })
})

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
  });
  // console.log(JSON.stringify(req.body.p_date, null, 2));
  if ( req.body.kakeibos.length !== 0 ) {
    kakeibo.insertMany(req.body,function (err) {

      if (err) {
        return res.status(422).send({ errors: [{ title: 'User error', detail: 'Someting went wrong!' }] })
      }
      return res.json({ "registerd": true })
    })
  }

})

module.exports = router;
