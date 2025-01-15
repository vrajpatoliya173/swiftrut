const express = require('express');
const coursectrl = require('../controllers/coursecontroller');

const routes = express.Router();

routes.post('/createcourse', coursectrl.createcourse);
routes.get('/getallcourse', coursectrl.getallcourse);
routes.put('/updatecourse/:id', coursectrl.updatecourse);
routes.delete('/removecourse/:id', coursectrl.removecourse);

routes.post('/assignedteacher/:id', coursectrl.assignedteacher);
routes.post('/enrollestudent/:id', coursectrl.enrollestudent);

module.exports = routes;