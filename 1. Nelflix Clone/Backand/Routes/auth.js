const express = require('express');
const userauth = require('../Cntrollers/authcontroller');

const routes = express.Router();

routes.post('/signup', userauth.signup);
routes.post('/login', userauth.login);
routes.post('/logout', userauth.logout);

module.exports = routes;