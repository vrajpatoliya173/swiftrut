const express = require('express');
const userctrl = require('../controllers/usercontroller');
const { jwtAuthMiddleware } = require("../config/jwt");

const routes = express.Router();

routes.post('/register', userctrl.register);
routes.post('/signin', userctrl.signin);
routes.post('/loggedout', userctrl.loggedout);

routes.use('/project', jwtAuthMiddleware, require('./project'));
routes.use('/payment', jwtAuthMiddleware, require('./payment'));

module.exports = routes;