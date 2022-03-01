// 日記情報
// 日付がキー
const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const ObjectId = Schema.ObjectId;
 
const DiarySchema = new Schema({
  // author: ObjectId,
  p_date: String,          //
  yoteiData: String,      // 予定情報
  wakeTime: String,       // 起床時間
  sleepTime: String,      // 就寝時間
  bzStartTime: String,    // 勤務時間　開始
  bzEndTime: String,      // 勤務時間　終了
  diaryData: String,      // 日記
})

module.exports = mongoose.model('Diary', DiarySchema)