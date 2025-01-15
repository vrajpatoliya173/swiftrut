const express = require('express');
const taskctrl = require('../controllers/taskcontroller');

const routes = express.Router();

routes.post('/createtask', taskctrl.createtask);
routes.get('/getalltask', taskctrl.getalltask);
routes.put('/updatetask/:id', taskctrl.updatetask);
routes.delete('/removetask/:id', taskctrl.removetask);
routes.put('/updateimptask/:id', taskctrl.updateimptask);
routes.get('/getimptask', taskctrl.getimptask);
routes.get('/getcomplatetask', taskctrl.getcomplatetask);
routes.get('/getincomplatetask', taskctrl.getincomplatetask);

module.exports = routes;