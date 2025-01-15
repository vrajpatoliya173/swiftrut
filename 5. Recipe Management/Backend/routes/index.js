const express = require('express');
const { jwtAuthMiddleware } = require('../config/jwt');

const routes = express.Router();

routes.use('/user', require('./user'));
routes.use('/recipe', jwtAuthMiddleware, require('./recipe'));

module.exports = routes;