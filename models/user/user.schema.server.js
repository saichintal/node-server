const mongoose = require('mongoose')
module.exports = mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  phone: String, 
  email: String, 
  role: String, 
}, {collection: 'user'});
