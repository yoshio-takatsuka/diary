// 家計簿情報
// 日付＋時間がキー
const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const ObjectId = Schema.ObjectId;
 
const KakeiboSchema = new Schema({
  // author: ObjectId,
  p_date: String,          //
  time: String,      // 実績時刻
  kamoku: String,   // 科目
  detail: String,      // 詳細
  etc: String,    // その他
  payKbn: String,      // 支払方法
  kingaku: Number     // 金額
})

module.exports = mongoose.model('Kakeibo', KakeiboSchema)