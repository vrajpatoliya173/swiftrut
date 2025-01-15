const mongoose = require('mongoose');
const multer = require('multer');

const projectSchema = mongoose.Schema({
	name:{
		type: String,
		required: true,
	},
	description:{
		type: String,
		required: true,
	},
	status:{
		type: String,
		default: 'pending',
	},
	createAt: {
		type: String,
		required: true,
	},
    updateAt: {
		type: String,
		required: true,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
        required: true,
	},
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
