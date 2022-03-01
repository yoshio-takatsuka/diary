const express = require('express')
const router = express.Router()
const Diary = require('../model/diary')     // 日記帳モデル
const Kakeibo = require('../model/kakeibo')     // 家計簿モデル
const Skill = require('../model/skill')     // スキルモデル
const DiaryCtrl = require('../controllers/user')



// diaries/serach/xxxxx  検索処理 xxxxxは日付（初期表示はなし）
// diaries/register      登録処理






router.get('/:p_date',  function (req, res) {

  const p_date = req.params.p_date
  // 日記情報
  Diary.find({p_date: p_date}, function (err, foundDiary) {
    
    if (err) {
      return res.status(422).send({ errors: [{ title: 'Diary error', detail: 'Diary not found!' }] })
    }
    if (foundDiary.length == 0 )  {
      return ""      
  
    } else {
      return res.json(foundDiary[0])
    }
    
  })
})


router.post('/register', function (req, res) {
  const { p_date, yoteiData, wakeTime, sleepTime, bzStartTime, bzEndTime, diaryData } = req.body
  // const p_date = req.body.p_date
  // const yoteiData = req.body.yoteiData
  // const wakeTime = req.body.wakeTime
  // const sleepTime = req.body.sleepTime
  // const bzStartTime = req.body.bzStartTime
  // const bzEndTime = req.body.bzEndTime
  // const diaryData = req.body.diaryData
  
  
  /* 上と下は同じ意味
  const username = req.body.username
  const email = req.body.email
  const password = req.body.password
  const confirmPassword = req.body.confirmPassword
  */

  if (!p_date) {
    return res.status(422).send({ errors: [{ title: 'Input error', detail: '日付を入力してください！' }] })
  }
  Diary.findOne({ p_date }, function (err, foundDiary) {
    if (err) {
      return res.status(422).send({ errors: [{ title: 'User error', detail: 'Someting went wrong!' }] })
    }
    if (foundDiary) {
      // データがあれば削除し追加
      // Updateでも一発でできそう(あれば勝手にインサート？)
      //  参考Url https://qiita.com/takehilo/items/4b89f8ee432b0a06c691
      foundDiary.remove({ "p_date": p_date }, function (err) {
        if (err) {
          return res.status(422).send({ errors: [{ title: 'User error', detail: "diary can't delete!" }] })
        }
      }, false, true);
    }
    // データ追加
    const diary = new Diary({ p_date, yoteiData, wakeTime, sleepTime, bzStartTime, bzEndTime, diaryData })
    diary.save(function (err) {
      if (err) {
        return res.status(422).send({ errors: [{ title: 'User error', detail: 'Someting went wrong!' }] })
      }
      return res.json({ "registerd": true })
    })

  })
})


module.exports = router