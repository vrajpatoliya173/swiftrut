const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema({
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

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;
