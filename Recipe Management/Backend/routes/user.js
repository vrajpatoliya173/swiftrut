const express = require('express');
const userctrl = require('../controllers/usercontroller');

const routes = express.Router();

routes.post('/signup', userctrl.signup);
routes.post('/login', userctrl.login);
routes.post('/logout', userctrl.logout);

module.exports = routes;