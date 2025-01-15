const Payment = require('../models/payment.model');
const moment = require('moment');

module.exports.makepayment = async (req, res) => {
    try {
        req.body.createAt = moment().format('LLL');
        req.body.projectId = req.params.id;
        req.body.userId = req.user._id;
        const payment = await Payment.create(req.body);
        if(payment){
            return res.status(200).json({ msg: 'Your payment', status: 1, response: 'success', Payment: payment });
        }
        else{
            return res.status(400).json({ msg: 'Payment not found!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.getpendingpayments = async (req, res) => {
    try {
        const payments = await Payment.find({userId: req.user._id, status: 'Pending'}).sort({_id: -1});
        if(payments.length === 0){
            return res.status(400).json({ msg: 'Pending payments are not found!!', status: 0, response: 'error' });
        }
        return res.status(200).json({ msg: 'Your pending payments', status: 1, response: 'success', PendigPayments: payments });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.getfailedpayments = async (req, res) => {
    try {
        const payments = await Payment.find({userId: req.user._id, status: 'Failed'}).sort({_id: -1});
        if(payments.length === 0){
            return res.status(400).json({ msg: 'Failed payments are not found!!', status: 0, response: 'error' });
        }
        return res.status(200).json({ msg: 'Your failed payments', status: 1, response: 'success', FailedPayments: payments });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.getpaidpayments = async (req, res) => {
    try {
        const payments = await Payment.find({userId: req.user._id, status: 'Paid'}).sort({_id: -1});
        if(payments.length === 0){
            return res.status(400).json({ msg: 'Paid payments are not found!!', status: 0, response: 'error' });
        }
        return res.status(200).json({ msg: 'Your paid payments', status: 1, response: 'success', PaidPayments: payments });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.markaspaid = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if(!payment){
            return res.status(400).json({ msg: 'Payment is not found!!', status: 0, response: 'error' });
        }
        
        if(payment.status = 'Paid'){
            return res.status(400).json({ msg: 'Payment is allrady paid!!', status: 0, response: 'error' });
        }

        // Mock payment gateway processing
        const isPaymentSuccessful = true; // Simulate success (can be randomized for testing)

        if(isPaymentSuccessful){
            payment.status = 'Paid';
            payment.paymentDate = moment().format('LLL');
            await payment.save();
            return res.status(200).json({ msg: 'Payment successfully', status: 1, response: 'success', Details: payment });
        }
        else{
            payment.status = 'Failed';
            await payment.save();
            return res.status(200).json({ msg: 'Payment failed!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}