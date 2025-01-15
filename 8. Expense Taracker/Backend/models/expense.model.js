const mongoose = require('mongoose');
const multer = require('multer');
const filepath = '/uploads/files'
const path = require('path');

const expenseSchema = mongoose.Schema({
	amount: {
		type: Number,
		required: true,
	}, 
	category: {
		type: String,
		required: true,
	},
	payment_method: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true
	},
    date: {
		type: Date,
		required: true
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

expenseSchema.statics.uploadfile = multer({storage: filedata}).single('file');
expenseSchema.statics.filepath = filepath;

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
