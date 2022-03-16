const express = require('express')
const kakeibo = require('../model/kakeibo')
const router = express.Router()
const Kakeibo = require('../model/kakeibo')     // 家計簿モデル

router.get('/:p_date', function (req, res) {

  const p_date = req.body.p_date
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
  console.log(JSON.stringify(req.body, null, 2));

  if (!req.body.p_date) {
    return res.status(422).send({ errors: [{ title: 'Input error', detail: '日付を入力してください！' }] })
  }
  // 指定日付データを削除し、今回データ追加
  Kakeibo.deleteMany({ "p_date": req.body.p_date }, function (err) {
    if (err) {
      console.log(JSON.stringify(err, null, 2));
    }
  });
 

  // データ追加　複数追加
  req.body.kakeibos.forEach(function (value) {
    const kakeiboDate = req.body.p_date;
    const kakeiboTime = value.kakeiboTime;
    const kakeiboKamoku = value.kakeiboKamoku;
    const kakeiboDetail = value.kakeiboDetail;
    const kakeiboEtc = value.kakeiboEtc;
    const kakeiboPayKbn = value.kakeiboPayKbn;
    const kakeiboKingaku = value.kakeiboKingaku;

    const kakeibo_data = new Kakeibo({ kakeiboDate, kakeiboTime, kakeiboKamoku, kakeiboDetail, kakeiboEtc, kakeiboPayKbn, kakeiboKingaku })
    console.log(JSON.stringify(kakeibo_data, null, 2));
    kakeibo_data.save(function (err) {

      if (err) {
        return res.status(422).send({ errors: [{ title: 'User error', detail: 'Someting went wrong!' }] })
      }
      return res.json({ "registerd": true })
    })
  });

})

module.exports = router;
