const mongoose = require('mongoose');
module.exports = mongoose.Schema({
  title: String,
  points: Number,
  description: String,
  questionType: {
    type: String,
    enum: [
      'ESSAY',
      'FILL_BLANKS',
      'TRUE_FALSE',
      'CHOICE'
    ]
  },
  choices: [{
    text: String,
    value: String,
    correct: Boolean
  }],
  blanks: [{
    type: String
}],
  true: Boolean, 
}, {collection: 'question'});