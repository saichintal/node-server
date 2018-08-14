const mongoose = require('mongoose')
const quizSchema = require('./quiz.schema.server');
const quizModel = mongoose.model('QuizModel', quizSchema);

createQuiz = quiz =>
  quizModel.create(quiz)

findAllQuizzes = () =>
  quizModel.find()

findQuizById = (quizId) => 
  quizModel.findById(quizId).populate('questions');


module.exports = {
  createQuiz, findAllQuizzes, findQuizById
};