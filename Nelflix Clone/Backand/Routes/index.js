const express = require('express');
const { jwtAuthMiddleware } = require('../Config/jwt');

const routes = express.Router();

routes.use('/usersAuth', require('./auth'));
routes.use('/movies', jwtAuthMiddleware, require('./movies'));
routes.use('/tvshows', jwtAuthMiddleware, require('./tvshows'));
routes.use('/serach', jwtAuthMiddleware, require('./search'));

module.exports = routes;