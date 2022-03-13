const express = require('express')
const router = express.Router()
const Diary = require('../model/diary')     // 日記帳モデル
const Kakeibo = require('../model/kakeibo')     // 家計簿モデル
const Skill = require('../model/skill')     // スキルモデル
const DiaryCtrl = require('../controllers/user')



// diaries/serach/xxxxx  検索処理 xxxxxは日付（初期表示はなし）
// diaries/register      登録処理






router.get('/:p_date', function (req, res) {

  const p_date = req.params.p_date
  // 家計簿情報
  Kakeibo.find({ p_date: p_date }, function (err, foundKakeibo) {

    if (err) {
      return res.status(422).send({ errors: [{ title: 'Kakeibo error', detail: 'Kakeibo not found!' }] })
    }
    if (foundKakeibo.length == 0) {
      return res.json("")

    } else {
      return res.json(foundKakeibo[0])
    }

  })
})


router.post('/register', function (req, res) {
  console.log(JSON.stringify(req, null, 2));

  if (!req.p_date) {
    return res.status(422).send({ errors: [{ title: 'Input error', detail: '日付を入力してください！' }] })
  }
  // 指定日付データを削除し、今回データ追加
  foundKakeibo.remove({ "p_date": req.p_date }, function (err) {
    if (err) {
      return res.status(422).send({ errors: [{ title: 'User error', detail: "kakeibo can't delete!" }] })
    }
  }, false, true);
  const kakeibo_data = new KakeiboSchema;
  kekeibo_data.p_date = req.p_date;
  // データ追加　複数追加
  req.kakeibos.forEach(function () {
    kakeibo_data.kakeibos = eq.kakeibos;
    kakeibo_data.save(function (err) {
      if (err) {
        return res.status(422).send({ errors: [{ title: 'User error', detail: 'Someting went wrong!' }] })
      }
      return res.json({ "registerd": true })
    })
  });



})

module.exports = router






  // Kakeibo.findOne( KakeiboSchema.p_date , function (err, foundKakeibo) {
  //   if (err) {
  //     return res.status(422).send({ errors: [{ title: 'User error', detail: 'Someting went wrong!' }] })
  //   }
  //   if (foundDiary) {
  //     // データがあれば削除し追加
  //     // Updateでも一発でできそう(あれば勝手にインサート？)
  //     //  参考Url https://qiita.com/takehilo/items/4b89f8ee432b0a06c691
  //     foundKakeibo.remove({ "p_date": p_date }, function (err) {
  //       if (err) {
  //         return res.status(422).send({ errors: [{ title: 'User error', detail: "kakeibo can't delete!" }] })
  //       }
  //     }, false, true);
  //   }
  //   // データ追加
  //   const kakeibo = new Kakeibo(KakeiboSchema)
  //   kakeibo.save(function (err) {
  //     if (err) {
  //       return res.status(422).send({ errors: [{ title: 'User error', detail: 'Someting went wrong!' }] })
  //     }
  //     return res.json({ "registerd": true })
  //   })










