const express = require('express');

const routes = express.Router();

routes.use('/admin', require('./admin'));
routes.use('/user', require('./user'));

module.exports = routes;