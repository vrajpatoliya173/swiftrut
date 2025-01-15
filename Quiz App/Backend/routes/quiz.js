const express = require('express');
const quistionctrl = require('../controllers/quizcontroller');

const routes = express.Router();

routes.post('/createquiz', quistionctrl.createquiz);
routes.get('/getallquiz', quistionctrl.getallquiz);
routes.get('/getquizbyid/:id', quistionctrl.getquizbyid);
routes.put('/updatequiz/:id', quistionctrl.updatequiz);
routes.delete('/removequiz/:id', quistionctrl.removequiz);

module.exports = routes;