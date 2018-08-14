const mongoose = require('mongoose')
module.exports = mongoose.Schema({
  title: String,
  courseId: String,
  capacity: String, 
  enrolled: String, 
}, {collection: 'section'});