const mongoose = require('mongoose');
const schema = require('./question.schema.server');
const questionModel = mongoose.model('QuestionModel', schema);

createQuestion = question =>
  questionModel.create(question)


module.exports = {
  createQuestion,
}
