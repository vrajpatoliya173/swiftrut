const express = require('express');
// const { jwtAuthMiddleware } = require("../config/jwt");

const routes = express.Router();

routes.use('/user', require('./user'));
routes.use('/quiz', require('./quiz'));

module.exports = routes;