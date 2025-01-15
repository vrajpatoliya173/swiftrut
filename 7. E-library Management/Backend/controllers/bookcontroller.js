const Book = require('../models/book.model');
const User = require('../models/user.model');
const moment = require('moment');

module.exports.createbook = async (req, res) => {
    try {
        req.body.createAt = moment().format('LLL');
        req.body.updateAt = moment().format('LLL');
        const createbook = await Book.create(req.body);
        if(createbook){
            return res.status(200).json({ msg: 'Book add successfully', status: 1, response: 'success', YourBook: createbook });
        }
        else{
            return res.status(400).json({ msg: 'Book is not add!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.getallbooks = async (req, res) => {
    try {
        const allbooks = await Book.find().sort({_id: -1});
        if(allbooks){
            return res.status(200).json({ msg: 'Your all Books', status: 1, response: 'success', AllBooks: allbooks });
        }
        else{
            return res.status(400).json({ msg: 'Books are not founds!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.updatbook = async (req, res) => {
    try {
        const bookdata = await Book.findById(req.params.id);
        if(bookdata){
            req.body.updateAt = moment().format('LLL');
            const updatebook = await Book.findByIdAndUpdate(req.params.id, req.body, {new: true});
            if(updatebook){
                return res.status(200).json({ msg: 'Book is updated successfully', status: 1, response: 'success', UpdatedBook: updatebook });
            }
            else{
                return res.status(400).json({ msg: 'Book is not updated!!', status: 0, response: 'error' });
            }
        }
        else{
            return res.status(400).json({ msg: 'Book is not found!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.removebook = async (req, res) => {
    try {
        const rmvbook = await Book.findByIdAndDelete(req.params.id);
        if(rmvbook){
            return res.status(200).json({ msg: 'Book is removed successfully', status: 1, response: 'success' });
        }
        else{
            return res.status(400).json({ msg: 'Book is not removed!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.availablebooks = async (req, res) => {
    try {
        const availablebook = await Book.find({available: true}).sort({_id: -1});
        if(!availablebook || availablebook.length === 0){
            return res.status(400).json({ msg: 'Book is unavailable!!', status: 0, response: 'error' });
        }
        
        return res.status(200).json({ msg: 'Your all available books', status: 1, response: 'success', AvailableBooks: availablebook });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.allborrowbooks = async (req, res) => {
    try {
        const borrowbook = await Book.find({available: false}).sort({_id: -1});
        if(!borrowbook || borrowbook.length === 0){
            return res.status(400).json({ msg: 'No Book is borrow!!', status: 0, response: 'error' });
        }
        
        return res.status(200).json({ msg: 'Your all borrow books', status: 1, response: 'success', BorrowedBooks: borrowbook });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}