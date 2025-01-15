const Property = require('../models/properties.model');
const moment = require('moment');
const path = require('path');
const fs = require('fs');

module.exports.addproprties = async (req, res) => {
    try {
        var img = ""
        if(req.file){
            img = Property.ipath + '/' + req.file.filename;
            req.body.createAt = moment().format('LLL');
            req.body.updateAt = moment().format('LLL');
            req.body.image = img;
            req.body.ownerId = req.user._id;
            const createproperty = await Property.create(req.body);
            if(createproperty){
                return res.status(200).json({ msg: 'Property created successfully', status: 1, response: 'success', AddProperty: createproperty });
            }
            else{
                return res.status(400).json({ msg: 'Property is not created!!', status: 0, response: 'error' });
            }
        }
        else{
            return res.status(400).json({ msg: 'File is not found', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.getallproperties = async (req, res) => {
    try {
        const allproperty = await Property.find().sort({_id: -1});
        if(allproperty){
            return res.status(200).json({ msg: 'All Properties', status: 1, response: 'success', AllPropertes: allproperty });
        }
        else{
            return res.status(400).json({ msg: 'Properties are not founds!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.getyourproperties = async (req, res) => {
    try {
        const userproperty = await Property.find({ownerId: req.user._id}).sort({_id: -1});
        if(userproperty.length === 0){
            return res.status(400).json({ msg: 'Properties are not founds!!', status: 0, response: 'error' });
        }
        if(userproperty){
            return res.status(200).json({ msg: 'Your all Properties', status: 1, response: 'success', YourPropertes: userproperty });
        }
        else{
            return res.status(400).json({ msg: 'Properties are not founds!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.updateproperty = async (req, res) => {
    try {
        if(req.file){
            const property = await Property.findById(req.params.id);

            if(property.ownerId.toString() !== req.user._id){
                return res.status(400).json({ msg: 'Not authorized to update this property!!', status: 0, response: 'error' });
            }

            var imgpath = path.join(__dirname,'..',property.image);
            if(fs.existsSync(imgpath)){
                fs.unlinkSync(imgpath); //delete image
            }
            req.body.image = Property.ipath + '/' + req.file.filename;
            req.body.updateAt = moment().format('LLL');
            const updateproperty = await Property.findByIdAndUpdate(req.params.id, req.body, {new: true});
            if(updateproperty){
                return res.status(200).json({ msg: 'Property updated successfully', status: 1, response: 'success', UpdatedProperty: updateproperty });
            }
            else{
                return res.status(400).json({ msg: 'Property is not updated!!', status: 0, response: 'error' });
            }
        }
        else{
            const property = await Property.findById(req.params.id);

            if(property.ownerId.toString() !== req.user._id){
                return res.status(400).json({ msg: 'Not authorized to update this property!!', status: 0, response: 'error' });
            }

            req.body.image = property.image;
            req.body.updateAt = moment().format('LLL');
            const updateproperty = await Property.findByIdAndUpdate(req.params.id, req.body, {new: true});
            if(updateproperty){
                return res.status(200).json({ msg: 'Property updated successfully', status: 1, response: 'success', UpdatedProperty: updateproperty });
            }
            else{
                return res.status(400).json({ msg: 'Property is not updated!!', status: 0, response: 'error' });
            }
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.removeproperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        var imgpath = path.join(__dirname, '..', property.image);
        if(property){
            if(property.ownerId.toString() !== req.user._id){
                return res.status(400).json({ msg: 'Not authorized to delete this property!!', status: 0, response: 'error' });
            }
            else{
                fs.unlinkSync(imgpath);
            }
        }
        else{
            return res.status(400).json({ msg: 'Property is not found!!', status: 0, response: 'error' });
        }

        const rmvproperty = await Property.findByIdAndDelete(req.params.id);
        if(rmvproperty){
            return res.status(200).json({ msg: 'Property is deleted successfully', status: 1, response: 'success' });
        }
        else{
            return res.status(400).json({ msg: 'Property is not deleted!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

