const mongoose = require('mongoose');
const multer = require('multer');

const quizSchema = mongoose.Schema({
	title:{
		type: String,
		required: true,
	},
	description:{
		type: String,
		required: true,
	},
	question_list: [
		{
			question_number: Number,
			question: String,
			options: {	
			}
		}
	],
	answers: {
		type: Array,
		required: true,
		default: []
	},
	createAt: {
		type: String,
		required: true,
	},
    updateAt: {
		type: String,
		required: true,
	}
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
