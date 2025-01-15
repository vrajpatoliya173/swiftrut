const express = require('express');
const bookctrl = require('../controllers/bookcontroller');

const routes = express.Router();

routes.post('/createbook', bookctrl.createbook);
routes.get('/getallbooks', bookctrl.getallbooks);
routes.put('/updatbook/:id', bookctrl.updatbook);
routes.delete('/removebook/:id', bookctrl.removebook);
routes.get('/availablebooks', bookctrl.availablebooks);
routes.get('/allborrowbooks', bookctrl.allborrowbooks);

module.exports = routes;