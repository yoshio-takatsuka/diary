// 家計簿情報
// 日付＋時間がキー
const mongoose = require('mongoose')
const { stringify } = require('querystring')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId;

const KakeiboSchema = new Schema({
  _id: ObjectId,
  p_date: String,          //
  kakeibos:[
    { 
      kakeiboTime: String,      // 実績時刻
      kakeiboKamoku: String,   // 科目
      kakeiboDetail: String,      // 詳細
      kakeiboPayKbn: String,      // 支払方法
      kakeiboKingaku: Number     // 金額 
     }
  ]

})

module.exports = mongoose.model('Kakeibo', KakeiboSchema)