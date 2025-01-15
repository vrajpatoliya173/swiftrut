const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
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

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
