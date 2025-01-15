const mongoose = require('mongoose');
const multer = require('multer');
const { type } = require('os');
const imgpath = '/uploads/eventimg'
const path = require('path');

const eventSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	}, 
	description: {
		type: String,
		required: true,
	},
	attendees: [
		{
			name: {
				type: String,
				required: true,
			},
			email: {
				type: String,
				required: true,
			},
			status:{
				type: String,
                default: 'Maybe'
			}
		}
	],
	date: {
		type: Date,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
    image: {
		type: String,
		required: true,
	},
    important: {
		type: Boolean,
		default: false
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
	}
});

const imgdata = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null,path.join(__dirname, '..', imgpath));
	},
	filename: (req, file, cb) => {
		cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});

eventSchema.statics.uploadimage = multer({storage: imgdata}).single('image');
eventSchema.statics.ipath = imgpath;

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
