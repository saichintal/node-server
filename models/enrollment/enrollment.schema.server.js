const mongoose = require('mongoose')
module.exports = mongoose.Schema({
  studentId: {  type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel'},
  sectionId: {  type: mongoose.Schema.Types.ObjectId,
               ref: 'SectionModel'},
  grade: String
}, {collection: 'enrollment'});