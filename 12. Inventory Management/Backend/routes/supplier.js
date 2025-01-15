const express = require('express');
const supplierctrl = require('../controllers/suppliercntroller');

const routes = express.Router();

routes.post('/addsupplier/:id', supplierctrl.addsupplier);
routes.get('/getsupplier', supplierctrl.getsupplier);
routes.put('/updatesupplier/:id', supplierctrl.updatesupplier);

module.exports = routes;