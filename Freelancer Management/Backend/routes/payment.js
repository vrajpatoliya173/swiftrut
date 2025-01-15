const express = require('express');
const paymentctrl = require('../controllers/paymentcontroller');

const routes = express.Router();

routes.post('/makepayment/:id', paymentctrl.makepayment);
routes.get('/getpendingpayments', paymentctrl.getpendingpayments);
routes.get('/getfailedpayments', paymentctrl.getfailedpayments);
routes.get('/getpaidpayments', paymentctrl.getpaidpayments);
routes.post('/markaspaid/:id', paymentctrl.markaspaid);

module.exports = routes;