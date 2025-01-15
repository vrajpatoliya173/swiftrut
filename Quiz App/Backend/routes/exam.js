const express = require('express');
const examctrl = require('../controllers/examcontroller');

const routes = express.Router();

routes.get('/getquiz', examctrl.getquiz);
routes.post('/giveExam/:id', examctrl.giveExam);
routes.get('/getexamresult/:id', examctrl.getexamresult);

module.exports = routes;