const express = require('express');

const routes = express.Router();

routes.use('/admin', require('./admin'));
routes.use('/teacher', require('./teacher'));
routes.use('/student', require('./student'));

module.exports = routes;