
module.exports = app => {

    const quizModel = require('../models/quizzes/quiz.model.server');
  
    createQuiz = (req, res) => {
      quizModel.createQuiz(req.body)
        .then(quiz => res.send(quiz))
    }
  
    findAllQuizzes = (req, res) => {
      quizModel.findAllQuizzes()
        .then(quizzes => res.send(quizzes))
    }

    findQuizById = (req, res) => {
      quizModel.findQuizById(req.params['qid'])
        .then(quizzes => res.send(quizzes))
    }
  
    app.post('/api/quiz', createQuiz);
    app.get('/api/quiz', findAllQuizzes);  
    app.get('/api/quiz/:qid', findQuizById);  

  }