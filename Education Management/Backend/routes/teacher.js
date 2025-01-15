const express = require('express');
const teacherctrl = require('../controllers/teachercontroller');
const { jwtAuthMiddleware } = require('../config/jwt');

const routes = express.Router();

routes.post('/signup', teacherctrl.signup);
routes.post('/login', teacherctrl.login);
routes.post('/logout', teacherctrl.logout);

// routes.use('/course', jwtAuthMiddleware, require('./course'));

routes.get('/getenrolledstudent', jwtAuthMiddleware, teacherctrl.getenrolledstudent);
routes.get('/getassignedcourses', jwtAuthMiddleware, teacherctrl.getassignedcourses);
routes.post('/updatecontent/:id', jwtAuthMiddleware, teacherctrl.updatecontent);
routes.post('/submissiongrade/:id', jwtAuthMiddleware, teacherctrl.submissiongrade);

module.exports = routes;