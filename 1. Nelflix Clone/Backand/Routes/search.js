const express = require('express');
const search = require('../Cntrollers/searchcontroller');

const routes = express.Router();

routes.get('/searchperson/:query', search.searchperson);
routes.get('/searchmovie/:query', search.searchmovie);
routes.get('/searchtvshow/:query', search.searchtvshow);

routes.get('/history', search.searchhistory);
routes.delete('/removehistory/:id', search.removehistory);

module.exports = routes;