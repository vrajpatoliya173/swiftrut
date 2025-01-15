const mongoose = require('mongoose');

const supplierSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	contect_no: {
		type: Number,
		required: true
	},
    role:{
        type: String,
		required: true,
    },
    userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
    inventoryId: {
        type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
    }
});

const Supplier = mongoose.model("Supplier", supplierSchema);

module.exports = Supplier;
