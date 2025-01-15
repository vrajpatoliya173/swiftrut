const express = require('express');
const { jwtAuthMiddleware } = require('../config/jwt');

const routes = express.Router();

routes.use('/user', require('./user'));
routes.use('/post', jwtAuthMiddleware, require('./post'));

module.exports = routes;