const express = require('express');
const { jwtAuthMiddleware } = require('../config/jwt');

const routes = express.Router();

routes.use('/user', require('./user'));
routes.use('/event', jwtAuthMiddleware, require('./event'));

module.exports = routes;