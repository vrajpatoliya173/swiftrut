const mongoose = require('mongoose');

const coueseSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	}, 
	description: {
		type: String,
		required: true,
	},
	startDate: {
		type: String,
		required: true,
	},
	endDate: {
		type: String,
		required: true,
	},
    assignedTeacher: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Teacher',
	},
	enrolledStudents:[
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Student',
		},
	],
	content: [{          
        type: String,                      
    }],
	createAt: {
		type: String,
		required: true,
	},
    updateAt: {
		type: String,
		required: true,
	}
});

const Course = mongoose.model("Course", coueseSchema);

module.exports = Course;
