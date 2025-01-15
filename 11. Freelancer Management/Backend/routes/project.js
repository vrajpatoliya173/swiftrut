const express = require('express');
const projectctrl = require('../controllers/projectcontroller');

const routes = express.Router();

routes.post('/createproject', projectctrl.createproject);
routes.get('/getallprojects', projectctrl.getallprojects);
routes.get('/getyourprojects', projectctrl.getyourprojects);
routes.get('/getallpendingprojects', projectctrl.getallpendingprojects);
routes.get('/getprojectbyid/:id', projectctrl.getprojectbyid);
routes.put('/updateproject/:id', projectctrl.updateproject);
routes.delete('/removeproject/:id', projectctrl.removeproject);

module.exports = routes;