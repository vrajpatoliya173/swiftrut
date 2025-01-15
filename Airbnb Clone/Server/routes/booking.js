const express = require('express');
const bookingctrl = require('../controllers/bookingcontroller');

const routes = express.Router();

routes.post('/bookproperty/:id', bookingctrl.bookproperty);
routes.get('/getbookproperty', bookingctrl.getbookedproperty);
routes.put('/cancelebooking/:id', bookingctrl.cancelebooking);
routes.get('/getcancelebooking', bookingctrl.getcancelebooking);

module.exports = routes;