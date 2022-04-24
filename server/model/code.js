// コード情報報
// 
const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const ObjectId = Schema.ObjectId;
 
const CodeSchema = new Schema({
  // author: ObjectId,
  codeKbn: String,required: true,  //　コード区分
  id: String, required: true,      // 連番
  kamoku: String,                  // 科目
  kbn: String,                     // 科目区分
  kouza: String,                   // 口座

})

module.exports = mongoose.model('Code', CodeSchema)