const mongoose = require('mongoose');
const imgpath = '/uploads/homeimg'
const path = require('path');
const multer = require('multer');

const propertySchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	}, 
	description: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		default: null,
	},
    rating: {
		type: Number,
		default: 3.5,
	},
    location: {
        type: String,
		required: true,
    },
    price: {
        type: Number,
		required: true,
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
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

const imgdata = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null,path.join(__dirname, '..', imgpath));
	},
	filename: (req, file, cb) => {
		cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});

propertySchema.statics.uploadimage = multer({storage: imgdata}).single('image');
propertySchema.statics.ipath = imgpath;

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
