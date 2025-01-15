const Project = require('../models/project.model');
const User = require('../models/user.model');
const moment = require('moment');

module.exports.createproject = async (req, res) => {
    try {
        req.body.createAt = moment().format('LLL');
        req.body.updateAt = moment().format('LLL');
        req.body.userId = req.user._id;
        const createproject = await Project.create(req.body);
        if(createproject){
            return res.status(200).json({ msg: 'Project created successfully', status: 1, response: 'success', YourProject: createproject });
        }
        else{
            return res.status(400).json({ msg: 'Project is not created!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.getallprojects = async (req, res) => {
    try {
        const projects = await Project.find().sort({_id: -1});
        if(projects.length === 0){
            return res.status(400).json({ msg: 'Project are not found!!', status: 0, response: 'error' });
        }
        return res.status(200).json({ msg: 'All Projects', status: 1, response: 'success', AllProjects: projects });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.getyourprojects = async (req, res) => {
    try {
        const projects = await Project.find({userId: req.user._id}).sort({_id: -1});
        if(projects.length === 0){
            return res.status(400).json({ msg: 'Project are not found!!', status: 0, response: 'error' });
        }
        return res.status(200).json({ msg: 'Your all Projects', status: 1, response: 'success', YourProjects: projects });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.getallpendingprojects = async (req, res) => {
    try {
        const projects = await Project.find({userId: req.user._id, status: 'pending'}).sort({_id: -1});
        if(projects.length === 0){
            return res.status(400).json({ msg: 'Project are not found!!', status: 0, response: 'error' });
        }
        return res.status(200).json({ msg: 'Your Pending Projects', status: 1, response: 'success', PendingProjects: projects });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.getprojectbyid = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if(project){
            return res.status(200).json({ msg: 'Project Quiz', status: 1, response: 'success', Project: project });
        }
        else{
            return res.status(400).json({ msg: 'Project not found!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.updateproject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id); 
        if(project){
            req.body.updateAt = moment().format('LLL');
            req.body.status = 'completed';
            const updateproject = await Project.findByIdAndUpdate(req.params.id, req.body, {new: true});
            if(updateproject){
                return res.status(200).json({ msg: 'Project updated successfully', status: 1, response: 'success', UpdatedProject: updateproject });
                }
            else{
                return res.status(400).json({ msg: 'Project is not updated!!', status: 0, response: 'error' });
            }
        }
        else{
            return res.status(400).json({ msg: 'Project not found!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.removeproject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if(project){
            const rmvproject = await Project.findByIdAndDelete(req.params.id);
            if(rmvproject){
                return res.status(200).json({ msg: 'Project is deleted successfully', status: 1, response: 'success' });
            }
            else{
                return res.status(400).json({ msg: 'Project is not deleted!!', status: 0, response: 'error' });
            }
        }
        else{
            return res.status(400).json({ msg: 'Project not found!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

