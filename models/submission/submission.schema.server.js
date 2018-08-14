const mongoose = require('mongoose')
module.exports = mongoose.Schema({
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuizModel'
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    answers: [{
        fillBlanksAnswer: [{
            type: String
        }],
        multipleChoiceAnswer: Number,
        trueFalseAnswer: Boolean,
        essayAnswer: String,
        question: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'QuestionModel'
        }
    }],
    points: Number
}, { timestamps: true}
    , { collection: 'submission' })