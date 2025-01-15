const express = require('express');
const { jwtAuthMiddleware } = require("../config/jwt");

const routes = express.Router();

routes.use('/user', require('./user'));

module.exports = routes;