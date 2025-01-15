const express = require('express');
const eventctrl = require('../controllers/eventcontroller');
const Event = require('../models/event.model'); 

const routes = express.Router();

routes.post('/createEvent', Event.uploadimage, eventctrl.createEvent);
routes.get('/getallEvents', eventctrl.getallEvents);
routes.put('/updateEvent/:id', Event.uploadimage, eventctrl.updateEvent);
routes.delete('/removeEvent/:id', eventctrl.removeEvent);
routes.put('/addtoimportant/:id', eventctrl.addtoimportant);
routes.get('/getimpEvent', eventctrl.getEvent);
routes.get('/eventbylocation/:location', eventctrl.eventbylocation);
routes.get('/eventbytype/:type', eventctrl.eventbytype);
routes.get('/eventbydate/:date', eventctrl.eventbydate);

module.exports = routes;