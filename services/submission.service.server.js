
module.exports = app => {
    const submissionModel = require('../models/submission/submission.model.server');

    submitQuiz = (req, res) => {
        var user = req.session['currentUser'];
        submissionModel.createSubmission(req.params['qid'], user._id, req.body)
            .then(sub => res.send(sub))
    }

    getAllSubmissionsOfQuizForStudent = (req, res) => {
        var user = req.session['currentUser'];
        submissionModel.getSubmissionsOfQuizForStudent(req.params['qid'], user._id)
        .then(subs => res.send(subs))
    }

    getAllSubmissionsOfQuiz = (req, res) => {
        submissionModel.getSubmissionsOfQuiz(req.params['qid'])
        .then(subs => res.send(subs))
    }

    getSpecificSubmissionOfQuizForStudent = (req, res) => {
        var user = req.session['currentUser'];
        submissionModel.getSpecificSubmissionOfQuizForStudent(req.params['qid'], req.params['sid'], user._id)
        .then(sub => res.send(sub))
    }

    app.post('/api/quiz/:qid/submission', submitQuiz)
    app.get('/api/quiz/:qid/submission', getAllSubmissionsOfQuizForStudent)
    app.get('/api/quiz/:qid/submissions', getAllSubmissionsOfQuiz)
    app.get('/api/quiz/:qid/submission/:sid', getSpecificSubmissionOfQuizForStudent)

  }