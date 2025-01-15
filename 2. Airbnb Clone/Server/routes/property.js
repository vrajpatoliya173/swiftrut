const express = require('express');
const propertyctrl = require('../controllers/propertycontroller');
const Property = require('../models/properties.model');

const routes = express.Router();

routes.post('/addproperties', Property.uploadimage, propertyctrl.addproprties);
routes.get('/getallproperties', propertyctrl.getallproperties);
routes.get('/getyourproperties', propertyctrl.getyourproperties);
routes.put('/updateproperty/:id', Property.uploadimage, propertyctrl.updateproperty);
routes.delete('/removeproperty/:id', propertyctrl.removeproperty);

module.exports = routes;