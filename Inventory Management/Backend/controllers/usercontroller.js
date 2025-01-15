const bcrypt = require('bcrypt');
const { generateToken } = require('../config/jwt');
const User = require('../models/user.model');
const Book = require('../models/inventory.model');
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
            status: 'User'
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
