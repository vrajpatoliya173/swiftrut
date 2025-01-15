const Post = require('../models/post.model');
const User = require('../models/user.model');
const moment = require('moment');
const path = require('path');
const fs = require('fs');

module.exports.createpost = async (req, res) => {
    try {
        var img = ""
        if(req.file){
            const userId = req.user._id;
            img = Post.ipath + '/' + req.file.filename;
            req.body.createAt = moment().format('LLL');
            req.body.updateAt = moment().format('LLL');
            req.body.image = img;
            req.body.userId = userId;
            const createpost = await Post.create(req.body);
            if(createpost){
                return res.status(200).json({ msg: 'Post created successfully', status: 1, response: 'success', YourPost: createpost });
            }
            else{
                return res.status(400).json({ msg: 'Post is not created!!', status: 0, response: 'error' });
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

module.exports.getallpost = async (req, res) => {
    try {
        const allpost = await Post.find({userId: req.user._id}).sort({_id: -1});
        if(allpost){
            return res.status(200).json({ msg: 'Your all posts', status: 1, response: 'success', AllPosts: allpost   });
        }
        else{
            return res.status(400).json({ msg: 'Posts are not founds!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

odule.exports.updatepost = async (req, res) => {
    try {
        if(req.file){
            const postdata = await Post.findById(req.params.id);
            var imgpath = path.join(__dirname,'..',postdata.image);
            if(fs.existsSync(imgpath)){
                fs.unlinkSync(imgpath);
            }
            req.body.image = Post.ipath + '/' + req.file.filename;
            req.body.updateAt = moment().format('LLL');
            const updatepost = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true});
            if(updatepost){
                return res.status(200).json({ msg: 'Post updated successfully', status: 1, response: 'success', UpdatedPost: updatepost });
            }
            else{
                return res.status(400).json({ msg: 'Post is not updated!!', status: 0, response: 'error' });
            }
        }
        else{
            const postdata = await Post.findById(req.params.id);
            req.body.image = postdata.image;
            req.body.updateAt = moment().format('LLL');
            const updatepost = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true});
            if(updatepost){
                return res.status(200).json({ msg: 'Post updated successfully', status: 1, response: 'success', UpdatedPost: updatepost });
            }
            else{
                return res.status(400).json({ msg: 'Post is not updated!!', status: 0, response: 'error' });
            }
        }

    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.removepost = async (req, res) => {
    try {
        const { id } = req.params;
        const findpost = await Post.findById(id);
        var imgpath = path.join(__dirname, '..', findpost.image);
        fs.unlinkSync(imgpath);
        const rmvpost = await Post.findByIdAndDelete(id);
        if(rmvpost){
            return res.status(200).json({ msg: 'Post is deleted successfully', status: 1, response: 'success' });
        }
        else{
            return res.status(400).json({ msg: 'Post is not deleted!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}
