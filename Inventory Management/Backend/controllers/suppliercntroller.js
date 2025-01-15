const Inventory = require('../models/inventory.model');
const Supplier = require('../models/supplier.model');

module.exports.addsupplier = async (req, res) => {
    try {
        const inventory = await Inventory.findById(req.params.id);
        if(inventory){
            req.body.role = "Supplier";
            req.body.userId = req.user._id;
            req.body.inventoryId = req.params.id;
            const validemail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if(!validemail.test(req.body.email)){
                return res.status(400).json({ msg: 'Invalid email', status: 0, response: 'error' });
            }
            if(req.body.contect_no < 10 && req.body.contect_no > 10){
                return res.status(400).json({ msg: 'Invalid contect no.', status: 0, response: 'error' });
            }
            const supplier = await Supplier.create(req.body);
            inventory.supplierId = supplier._id
            await inventory.save();
            if(supplier){
                return res.status(200).json({ msg: 'Supplier added successfully', status: 1, response: 'success', Supplier: supplier });
            }
            else{
                return res.status(400).json({ msg: 'Supplier is not added!!', status: 0, response: 'error' });
            }
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.getsupplier = async (req, res) => {
    try {
        const allsuppliers = await Supplier.find({userId: req.user._id}).sort({_id: -1});
        if(allsuppliers.length === 0){
            return res.status(400).json({ msg: 'No suppliers found!!', status: 0, response: 'error' });
        }
        if(allsuppliers){
            return res.status(200).json({ msg: 'Your all suppliers', status: 1, response: 'success', AllSuppliers: allsuppliers });
        }
        else{
            return res.status(400).json({ msg: 'suppliers are not found!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.updatesupplier = async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if(supplier){
            const updatesupplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, {new: true});
            if(updatesupplier){
                return res.status(200).json({ msg: 'Supplier detailes is updated successfully', status: 1, response: 'success', UpdatedSupplier: updatesupplier });
            }
            else{
                return res.status(400).json({ msg: 'Supplier detailes is not updated!!', status: 0, response: 'error' });
            }
        }
        else{
            return res.status(400).json({ msg: 'Supplier is not found!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}