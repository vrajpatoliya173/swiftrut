const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	}, 
	author: {
		type: String,
		required: true,
	},
	genre: {
		type: String,
		required: true,
	},
	publicationDate: {
		type: Date,
		required: true,
	},
    available: {
		type: Boolean,
		default: true
	},
	borrowedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		default: null
	},
	borrowDate: {
		type: String,
		default: null,
	},
	returnDate: {
		type: String,
		default: null,
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

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
