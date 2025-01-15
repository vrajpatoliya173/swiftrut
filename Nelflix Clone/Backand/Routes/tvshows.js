const express = require('express');
const tvshow = require('../Cntrollers/tvshowcontroller');

const routes = express.Router();

routes.get('/tvshow', tvshow.trandingtvshow);
routes.get('/trailer/:id', tvshow.tvshowtrailer);
routes.get('/details/:id', tvshow.tvshowdetails);
routes.get('/tvshow/:id', tvshow.similartvshow);
routes.get('/:category', tvshow.tvshowcategory);

module.exports = routes;