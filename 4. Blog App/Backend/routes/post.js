const express = require('express');
const postctrl = require('../controllers/postcontroller');
const Post = require('../models/post.model'); 

const routes = express.Router();

routes.post('/createpost', Post.uploadimage, postctrl.createpost);
routes.get('/getallpost', postctrl.getallpost);
routes.put('/updatepost/:id', Post.uploadimage, postctrl.updatepost);
routes.delete('/removepost/:id', postctrl.removepost);

module.exports = routes;