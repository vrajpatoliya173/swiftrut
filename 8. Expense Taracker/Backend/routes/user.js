const express = require('express');
const userctrl = require('../controllers/usercontroller');
const { jwtAuthMiddleware } = require('../config/jwt');

const routes = express.Router();

routes.post('/signup', userctrl.signup);
routes.post('/login', userctrl.login);
routes.post('/logout', userctrl.logout);

routes.use('/expense', jwtAuthMiddleware, require('./expense'));

module.exports = routes;