const express = require('express');
const adminctrl = require('../controllers/admincontroller');
const { jwtAuthMiddleware } = require('../config/jwt');

const routes = express.Router();

routes.post('/signup', adminctrl.signup);
routes.post('/login', adminctrl.login);
routes.post('/logout', adminctrl.logout);

routes.use('/book', jwtAuthMiddleware, require('./book'));

module.exports = routes;