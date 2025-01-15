const express = require('express');
const userctrl = require('../controllers/usercontroller');
const { jwtAuthMiddleware } = require('../config/jwt');

const routes = express.Router();

routes.post('/signup', userctrl.signup);
routes.post('/login', userctrl.login);
routes.post('/logout', userctrl.logout);

routes.get('/availablebooks', jwtAuthMiddleware, userctrl.availablebooks);
routes.post('/borrowbook/:id', jwtAuthMiddleware, userctrl.borrowbook);
routes.post('/returnboreowbook/:id', jwtAuthMiddleware, userctrl.returnboreowbook);
routes.get('/allborrowbooks', jwtAuthMiddleware, userctrl.allborrowbooks);

module.exports = routes;