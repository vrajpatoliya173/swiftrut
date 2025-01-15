const Inventory = require('../models/inventory.model');
const moment = require('moment');
const fs = require('fs');
const csv = require('csvtojson');

module.exports.createinventory = async (req, res) => {
    try {
        req.body.createAt = moment().format('LLL');
        req.body.updateAt = moment().format('LLL');
        req.body.userId = req.user._id;
        const createinventory = await Inventory.create(req.body);
        if(createinventory){
            return res.status(200).json({ msg: 'Inventory created successfully', status: 1, response: 'success', YourInventory: createinventory });
        }
        else{
            return res.status(400).json({ msg: 'Inventory is not created!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.getallinventory = async (req, res) => {
    try {
        const allinventory = await Inventory.find({userId: req.user._id}).sort({_id: -1});
        if(allinventory.length === 0){
            return res.status(400).json({ msg: 'No inventory found!!', status: 0, response: 'error' });
        }
        if(allinventory){
            return res.status(200).json({ msg: 'Your all Inventory', status: 1, response: 'success', AllInventory: allinventory });
        }
        else{
            return res.status(400).json({ msg: 'Inventory is not founds!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.updateinventory = async (req, res) => {
    try {
        const inventory = await Inventory.findById(req.params.id);
        req.body.updateAt = moment().format('LLL');
        if(inventory){
            const updateinventory = await Inventory.findByIdAndUpdate(req.params.id, req.body, {new: true});
            if(updateinventory){
                return res.status(200).json({ msg: 'Inventory is updated successfully', status: 1, response: 'success', UpdatedInventory: updateinventory });
            }
            else{
                return res.status(400).json({ msg: 'Inventory is not updated!!', status: 0, response: 'error' });
            }
        }
        else{
            return res.status(400).json({ msg: 'Inventory is not found!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.removeinventory = async (req, res) => {
    try {
        const inventory = await Inventory.findById(req.params.id);
        if(inventory){
            const rmvinventory = await Inventory.findByIdAndDelete(req.params.id);
            if(rmvinventory){
                return res.status(200).json({ msg: 'Inventory is removed successfully', status: 1, response: 'success' });
            }
            else{
                return res.status(400).json({ msg: 'Inventory is not removed!!', status: 0, response: 'error' });
            }
        }
        else{
            return res.status(400).json({ msg: 'Inventory is not found!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.uploadcsvfile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ msg: 'No file uploaded!!', status: 0, response: 'error' });
        }
        const filePath = req.file.path;
        const csvfileremove = (filePath) => {
            fs.unlink(filePath, (err) => {
                 if (err) {
                    console.error(`Error deleting file: ${filePath}`, err);
                } else {
                    console.log(`File successfully deleted: ${filePath}`);
                }
            });
        }

        const inventoryData = [];
        csv()
        .fromFile(req.file.path)
        .then(async (rows)=>{
            
            for(var i = 0; i < rows.length; i++){
                inventoryData.push({
                    name: rows[i].name,
                    description: rows[i].description,
                    category: rows[i].category,
                    quantity: rows[i].quantity,
                    price: rows[i].price,
                    createAt: moment().format('LLL'),
                    updateAt: moment().format('LLL'),
                    userId: req.user._id,
                })
            };
            const csvdata = await Inventory.insertMany(inventoryData);
            if(csvdata){
                csvfileremove(filePath);
                return res.status(200).send({ msg: 'CSV processed and file deleted successfully', status: 1, response: 'success', FileData: csvdata });
            }
            else{
                return res.status(400).json({ msg: 'CSV file is not uploaded!!', status: 0, response: 'error' });
            }
        });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}
