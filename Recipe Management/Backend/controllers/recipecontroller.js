const Recipe = require('../models/recipe.model');
const moment = require('moment');
const path = require('path');
const fs = require('fs');

module.exports.createrecipe = async (req, res) => {
    try {
        var img = ""
        if(req.file){
            const userId = req.user._id;
            img = Recipe.ipath + '/' + req.file.filename;
            req.body.createAt = moment().format('LLL');
            req.body.updateAt = moment().format('LLL');
            req.body.image = img;
            req.body.userId = userId;
            const createrecipe = await Recipe.create(req.body);
            if(createrecipe){
                return res.status(200).json({ msg: 'Recipe is created successfully', status: 1, response: 'success', YourPost: createrecipe });
            }
            else{
                return res.status(400).json({ msg: 'Recipe is not created!!', status: 0, response: 'error' });
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

module.exports.getallrecipe = async (req, res) => {
    try {
        const allrecipe = await Recipe.find({userId: req.user._id}).sort({_id: -1});
        if(allrecipe){
            return res.status(200).json({ msg: 'Your all recipes', status: 1, response: 'success', AllRecipes: allrecipe });
        }
        else{
            return res.status(400).json({ msg: 'Recipes are not founds!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.updaterecipe = async (req, res) => {
    try {
        if(req.file){
            const recipedata = await Recipe.findById(req.params.id);
            var imgpath = path.join(__dirname,'..',recipedata.image);
            if(fs.existsSync(imgpath)){
                fs.unlinkSync(imgpath); //delete image
            }
            req.body.image = Recipe.ipath + '/' + req.file.filename;
            req.body.updateAt = moment().format('LLL');
            const updaterecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true});
            if(updaterecipe){
                return res.status(200).json({ msg: 'Recipe updated successfully', status: 1, response: 'success', UpdatedRecipe: updaterecipe });
            }
            else{
                return res.status(400).json({ msg: 'Recipe is not updated!!', status: 0, response: 'error' });
            }
        }
        else{
            const recipedata = await Recipe.findById(req.params.id);
            req.body.image = recipedata.image;
            req.body.updateAt = moment().format('LLL');
            const updaterecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true});
            if(updaterecipe){
                return res.status(200).json({ msg: 'Recipe updated successfully', status: 1, response: 'success', UpdatedRecipe: updaterecipe });
            }
            else{
                return res.status(400).json({ msg: 'Recipe is not updated!!', status: 0, response: 'error' });
            }
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.removerecipe = async (req, res) => {
    try {
        const findrecipe = await Recipe.findById(req.params.id);
        var imgpath = path.join(__dirname, '..', findrecipe.image);
        fs.unlinkSync(imgpath);
        const rmvrecipe = await Recipe.findByIdAndDelete(req.params.id);
        if(rmvrecipe){
            return res.status(200).json({ msg: 'Recipe is deleted successfully', status: 1, response: 'success' });
        }
        else{
            return res.status(400).json({ msg: 'Recipe is not deleted!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.getrecipebycuisine = async (req, res) => {
    try {
        const recipebycuisine = await Recipe.find({cuisine: req.params.cuisine}).sort({_id: -1});
        if(recipebycuisine && recipebycuisine.length > 0){
            return res.status(200).json({ msg: 'Your all recipes by cuisine', status: 1, response: 'success', Recipe_By_Cuisine: recipebycuisine });
        }
        else{
            return res.status(400).json({ msg: 'Recipes are not founds by cuisine!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.saverecipe = async (req, res) => {
    try {
        const recipedata = await Recipe.findById(req.params.id);
        const saverecipe = recipedata.saved;
        const updateimp = await Recipe.findByIdAndUpdate(req.params.id, {saved: !saverecipe});
        if(updateimp){
            return res.status(200).json({ msg: 'Racipe is successfully saved', status: 1, response: 'success' });
        }
        else{
            return res.status(400).json({ msg: 'Racipe is not saved!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.getsaverecipe = async (req, res) => {
    try {
        const findsaveracipe = await Recipe.find({saved: true}).sort({_id: -1});
        if(findsaveracipe){
            return res.status(200).json({ msg: 'Your all saved recipes', status: 1, response: 'success', SaveRacipe: findsaveracipe });
        }
        else{
            return res.status(400).json({ msg: 'No saved racipes!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}