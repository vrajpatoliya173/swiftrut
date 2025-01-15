const express = require('express');
const studentctrl = require('../controllers/studentcontroller');
const { jwtAuthMiddleware } = require('../config/jwt');

const routes = express.Router();

routes.post('/signup', studentctrl.signup);
routes.post('/login', studentctrl.login);
routes.post('/logout', studentctrl.logout);

routes.get('/getenrollmentcourse', jwtAuthMiddleware, studentctrl.getenrollmentcourse);
routes.post('/submission/:id', jwtAuthMiddleware, studentctrl.submission);

module.exports = routes;