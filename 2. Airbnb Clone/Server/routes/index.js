const express = require('express');
const { jwtAuthMiddleware } = require('../config/jwt');

const routes = express.Router();

routes.use('/user', require('./user'));
routes.use('/property', jwtAuthMiddleware, require('./property'));

module.exports = routes;