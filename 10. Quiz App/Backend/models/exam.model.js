const mongoose = require('mongoose');

const examSchema = mongoose.Schema({
	answers:{
		type: [Number],
		required: true,
	},
	score:{
		type: Number,
		required: true,
	},
    result:{
		type: String,
		required: true,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
        required: true,
	},
    quizId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Quiz',
        required: true,
	}
});

const Exam = mongoose.model("Exam", examSchema);

module.exports = Exam;

