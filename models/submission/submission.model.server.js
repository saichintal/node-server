const mongoose = require('mongoose')
const submissionSchema = require('./submission.schema.server');
const submissionModel = mongoose.model('SubmissionModel', submissionSchema);

createSubmission = (quizId, studentId, quiz) => {
    var answers = [];

    var points = 0; 

    quiz.questions.forEach(question => {
        var answer = {
            question: question._id,
        }
        switch (question.questionType) {
            case 'TRUE_FALSE':
                answer.trueFalseAnswer = question.trueFalseAnswer; 
                if (answer.trueFalseAnswer == question.true) {
                    points = points + question.points; 
                }
                break;
            case 'CHOICE':
                answer.multipleChoiceAnswer = question.multipleChoiceAnswer; 
                if (answer.multipleChoiceAnswer != null && question.choices[answer.multipleChoiceAnswer].correct) {
                    points = points + question.points; 
                }
                break;
            case 'ESSAY':
                answer.essayAnswer = question.essayAnswer; 
                if (answer.essayAnswer != null) {
                    points = points + question.points; 
                }
                break;
            case 'FILL_BLANKS':
                answer.fillBlanksAnswer = question.fillBlanksAnswer; 
                var correct = false; 
                answer.fillBlanksAnswer.forEach((blank, index) => {
                    if (blank != null) {
                        correct = true; 
                        if (blank != question.blanks[index].replace("*", "")) {
                            correct = false; 
                        }
                    }
                });
                if (correct) {
                    points = points + question.points; 
                }
                break;
            default: 
                break; 
        }
        answers.push(answer); 
    });
    var sub = {
        quiz: quizId, 
        student: studentId, 
        answers: answers, 
        points: points,
    }
   
    return submissionModel.create(sub)
}

getSubmissionsOfQuizForStudent = (quizId, studentId) => {
    return submissionModel.find({ student: studentId, quiz: quizId })
        .populate({ 
            path: 'quiz',
            populate: {
              path: 'questions'
                } 
         }).populate('student').then(subs => {
        return subs; 
    })
}

getSubmissionsOfQuiz = (quizId) => {
    return submissionModel.find({quiz: quizId })
        .populate({ 
            path: 'quiz',
            populate: {
              path: 'questions'
                } 
         }).populate('student').then(subs => {
        return subs; 
    })
}

getSpecificSubmissionOfQuizForStudent = (quizId, subId, studentId) => {
    return submissionModel.findById(subId)
        .populate('quiz').populate('quiz.questions').populate('answers.question').populate('student').then(sub => {
        return sub; 
    })
}

findAllSubmissions = () =>
    submissionModel.find()

module.exports = {
    createSubmission, findAllSubmissions, getSubmissionsOfQuizForStudent, getSpecificSubmissionOfQuizForStudent,
    getSubmissionsOfQuiz
};