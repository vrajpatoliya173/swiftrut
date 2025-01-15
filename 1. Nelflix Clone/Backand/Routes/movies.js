const express = require('express');
const movies = require('../Cntrollers/moviescontroller');

const routes = express.Router();

routes.get('/trending', movies.trandingmovies);
routes.get('/trailer/:id', movies.movietrailer);
routes.get('/details/:id', movies.moviedetails);
routes.get('/movies/:id', movies.similarmovies);
routes.get('/:category', movies.moviescategory);

module.exports = routes;