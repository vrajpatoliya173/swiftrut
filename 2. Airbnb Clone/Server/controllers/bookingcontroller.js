const Property = require('../models/properties.model');
const Booking = require('../models/booking.model');
const moment = require('moment');

module.exports.bookproperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);

        if(property){
            if(property.ownerId.toString() === req.user._id){
                return res.status(400).json({ msg: 'Not authorized to booking this property!!', status: 0, response: 'error' });
            }
            req.body.propertyId = property._id;
            req.body.userId = req.user._id;
            req.body.startDate = moment(req.body.startDate, "DD/MM/YYYY").format('ll');
            req.body.endDate = moment(req.body.endDate, "DD/MM/YYYY").format('ll');
            req.body.status = 'Confirmed';
            const booking = await Booking.create(req.body);
            if(booking){
                return res.status(200).json({ msg: 'Property is successfully bokked', status: 1, response: 'success', Booked: booking });
            }
            else{
                return res.status(400).json({ msg: 'Property is not bokked!!', status: 0, response: 'error' });
            }
        }
        else{
            return res.status(400).json({ msg: 'Property is not found!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.getbookedproperty = async (req, res) => {
    try {
        const bookproperty = await Booking.find({userId: req.user._id, status: 'Confirmed'}).sort({_id: -1}).populate('propertyId');
        if(bookproperty){
            return res.status(200).json({ msg: 'Your booked Properties', status: 1, response: 'success', BookedProperty: bookproperty });
        }
        else{
            return res.status(400).json({ msg: 'Properties are not founds!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.cancelebooking= async (req, res) => {
    try {
        const bookproperty = await Booking.findById(req.params.id);
        if(bookproperty){
            bookproperty.status = 'Canceled';
            const cancelebooking = await Booking.findByIdAndUpdate(bookproperty._id, req.body, { new: true}); 
            if(cancelebooking){
                return res.status(200).json({ msg: 'Your booking has been canceled', status: 1, response: 'success' });
            }
            else{
                return res.status(200).json({ msg: 'Your booking is not canceled', status: 1, response: 'success' });
            }
        }
        else{
            return res.status(400).json({ msg: 'Booking not found!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.getcancelebooking = async (req, res) => {
    try {
        const booking = await Booking.find({userId: req.user._id, status: 'Canceled'}).populate('propertyId');
        if(booking){
            return res.status(200).json({ msg: 'Your canceled bookings', status: 1, response: 'success', CanceleBookings: booking });
        }
        else{
            return res.status(400).json({ msg: 'Canceled bookings are not founds!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}