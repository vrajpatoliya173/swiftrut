const express = require('express');
const recipectrl = require('../controllers/recipecontroller');
const Recipe = require('../models/recipe.model'); 

const routes = express.Router();

routes.post('/createrecipe', Recipe.uploadimage, recipectrl.createrecipe);
routes.get('/getallrecipe', recipectrl.getallrecipe);
routes.put('/updaterecipe/:id', Recipe.uploadimage, recipectrl.updaterecipe);
routes.delete('/removerecipe/:id', recipectrl.removerecipe);
routes.get('/recipebycuisine/:cuisine', recipectrl.getrecipebycuisine);
routes.put('/saverecipe/:id', recipectrl.saverecipe);
routes.get('/getsaverecipe', recipectrl.getsaverecipe);

module.exports = routes;