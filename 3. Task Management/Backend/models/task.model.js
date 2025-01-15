const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	}, 
	desc: {
		type: String,
		required: true,
	},
	important: {
		type: Boolean,
		default: false,
	},
    complate: {
		type: Boolean,
		default: false,
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

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
