const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  startDate: {
		type: String,
		required: true,
	},
  endDate: {
		type: String,
		required: true,
	},
  status: {
		type: String,
		default: 'Pending'
	}
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
