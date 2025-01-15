const mongoose = require('mongoose');
const multer = require('multer');
const filepath = '/uploads/files'
const path = require('path');

const inventorySchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String
	},
	category: {
		type: String,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	price: {
		type: Number,
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
		required: true
	},
	supplierId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Supplier',
	}
});

const filedata = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null,path.join(__dirname, '..', filepath));
	},
	filename: (req, file, cb) => {
		cb(null,file.fieldname + '-' + Date.now() + '-' + path.extname(file.originalname));
	},
	fileFilter: (req, file, cb) => {
		if (file.mimetype === 'text/csv') cb(null, true);
		else cb(new Error('Only CSV files are allowed'), false);
	}
});

inventorySchema.statics.uploadfile = multer({storage: filedata}).single('file');
inventorySchema.statics.filepath = filepath;

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;
