const mongoose = require('mongoose');
const multer = require('multer');
const imgpath = '/uploads/postimg'
const path = require('path');

const postSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	}, 
	desc: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
    image: {
		type: String,
		required: true,
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

postSchema.statics.uploadimage = multer({storage: imgdata}).single('image');
postSchema.statics.ipath = imgpath;

const Post = mongoose.model("Post", postSchema);

module.exports = Post;