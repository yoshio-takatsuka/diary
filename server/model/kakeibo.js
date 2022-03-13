// 家計簿情報
// 日付＋時間がキー
const mongoose = require('mongoose')
const { stringify } = require('querystring')
const Schema = mongoose.Schema
// const ObjectId = Schema.ObjectId;
 
const KakeiboSchema = new Schema({
  // author: ObjectId,
  p_date: String,          //
  kakeiTime: String,      // 実績時刻
  kakeiTamoku: String,   // 科目
  kakeiDetail: String,      // 詳細
  kakeiEtc: String,    // その他
  kakeiPayKbn: String,      // 支払方法
  kakeiKingaku: Number     // 金額 

})

module.exports = mongoose.model('Kakeibo', KakeiboSchema)