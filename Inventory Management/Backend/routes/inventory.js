const express = require('express');
const inventoryctrl = require('../controllers/inventorycontroller');
const Inventory = require('../models/inventory.model');

const routes = express.Router();

routes.post('/createinventory', inventoryctrl.createinventory);
routes.get('/getallinventory', inventoryctrl.getallinventory);
routes.put('/updateinventory/:id', inventoryctrl.updateinventory);
routes.post('/uploadcsvfile', Inventory.uploadfile, inventoryctrl.uploadcsvfile);

module.exports = routes;