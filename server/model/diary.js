// 日記情報
// 日付がキー
const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const ObjectId = Schema.ObjectId;
 
const DiarySchema = new Schema({
  // author: ObjectId,
  p_date: String,          //
  yotei_data: String,      // 予定情報
  wake_time: String,       // 起床時間
  sleep_time: String,      // 就寝時間
  bz_startTime: String,    // 勤務時間　開始
  bz_endTime: String,      // 勤務時間　終了
  diary_data: String,      // 日記
})

module.exports = mongoose.model('Diary', DiarySchema)