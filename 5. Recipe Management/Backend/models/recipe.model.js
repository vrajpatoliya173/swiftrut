const mongoose = require('mongoose');
const multer = require('multer');
const imgpath = '/uploads/recipeimg'
const path = require('path');

const recipeSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	}, 
	description: {
		type: String,
		required: true,
	},
	ingredients: [
		{
			type: String,
			required: true,
		}
	],
	instructions: {
		type: String,
		required: true,
	},
	cuisine: {
		type: String,
		required: true,
	},
	cookingtime: {
        type: Number,
        required: true
    },
    image: {
		type: String,
		required: true,
	},
    saved: {
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

recipeSchema.statics.uploadimage = multer({storage: imgdata}).single('image');
recipeSchema.statics.ipath = imgpath;

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
