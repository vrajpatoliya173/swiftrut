const express = require('express');
const { jwtAuthMiddleware } = require('../config/jwt');

const routes = express.Router();

routes.use('/user', require('./user'));
routes.use('/task', jwtAuthMiddleware, require('./task'));

module.exports = routes;