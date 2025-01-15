const bcrypt = require('bcrypt');
const { generateToken } = require('../config/jwt');
const User = require('../models/user.model');
const Book = require('../models/book.model');
const moment = require('moment');

module.exports.signup = async (req, res) => {
    try{
        const { email, password, username } = req.body;
        if(!email || !password || !username){
            return res.status(400).json({ msg: 'All fields are required', status: 0, response: 'error' });
        }
        const validemail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!validemail.test(email)){
            return res.status(400).json({ msg: 'Invalid email', status: 0, response: 'error' });
        }

        if(password.length < 6 || password.length > 6){
            return res.status(400).json({ msg: 'Password must be at least 6 characters', status: 0, response: 'error' });
        }

        const exitingemail = await User.findOne({email: email});
        if(exitingemail){
            return res.status(400).json({ msg: 'Email is alrady exist', status: 0, response: 'error' });
        }

        const exitingusername = await User.findOne({username: username});
        if(exitingusername){
            return res.status(400).json({ msg: 'Username is alrady exist', status: 0, response: 'error' });
        }

        const bcryptpassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            username,
            password: bcryptpassword,
        });

        const userdata = await newUser.save();
        if(userdata){
            return res.status(200).json({ msg: 'Registred successfully', status: 1, response: 'success', UserData: userdata });
        }
        else{
            return res.status(400).json({ msg: 'You are not registred!! Somthing wrong..', status: 0, response: 'error' });
        }

    }
    catch(err){
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.login = async (req, res) => {
    try {
        const userdata = await User.findOne({email: req.body.email})
        const payload = {
            email: req.body.email,
            password: req.body.password,
            userdata
        }
        let checkemail = await User.findOne({ email: req.body.email });
        if (checkemail) {
            let comparepass = await bcrypt.compare(payload.password, checkemail.password);
            if (comparepass) {
                const token = generateToken(payload);
                res.cookie('userdata-jwt', token);
                return res.status(200).json({ msg: 'Login Successfully', status: 1, response: 'success', Userdata: userdata });
            }
            else {
                return res.status(400).json({ msg: 'Password is not valid', status: 0, response: 'error' });
            }
        }
        else {
            return res.status(400).json({ msg: 'Email is not valid', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.logout = async (req, res) => {
    try {
        res.clearCookie('userdata-jwt');
        return res.status(200).json({ msg: 'Logged Out successfully', status: 1, response: 'success' });
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

module.exports.borrowbook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if(!book || !book.available){
            return res.status(400).json({ msg: 'Book is unavailable!!', status: 0, response: 'error' });
        }
        
        book.available = false;
        book.borrowedBy = req.user._id;
        book.borrowDate = moment().format('LLL');
        book.returnDate = null

        await book.save();
        return res.status(200).json({ msg: 'Book borrowed successfully', status: 1, response: 'success', Book: book });        

    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.returnboreowbook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if(!book || book.available){
            return res.status(400).json({ msg: 'Book is already available', status: 0, response: 'error' });
        }
        
        book.available = true;
        book.borrowedBy = null;
        book.borrowDate = null;
        book.returnDate = moment().format('LLL');

        await book.save();
        return res.status(200).json({ msg: 'Book returned successfully', status: 1, response: 'success', Book: book });        

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