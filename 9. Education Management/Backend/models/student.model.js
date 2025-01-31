const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	role:{
        type: String,
		required: true,
    }
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
