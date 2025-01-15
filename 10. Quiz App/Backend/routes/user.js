const express = require('express');
const userctrl = require('../controllers/usercontroller');
const { jwtAuthMiddleware } = require("../config/jwt");

const routes = express.Router();

routes.post('/register', userctrl.register);
routes.post('/signin', userctrl.signin);
routes.post('/loggedout', userctrl.loggedout);

routes.use('/exam', jwtAuthMiddleware, require('./exam'));

module.exports = routes;