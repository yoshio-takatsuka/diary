// スキル情報
// 日付＋時間がキー
const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const ObjectId = Schema.ObjectId;
 
const SkillSchema = new Schema({
  // author: ObjectId,
  p_date: String,          //
  time: String,      // 実績時刻
  kbn: String,   // 科目
  detail: String,      // 詳細
})

module.exports = mongoose.model('Skill', SkillSchema)