const bcrypt = require('bcrypt');
const { generateToken } = require('../config/jwt');
const Admin = require('../models/admin.model');
const Teacher = require('../models/teacher.model');
const Student = require('../models/student.model');

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

        const exitingemail = await Admin.findOne({email: email});
        if(exitingemail){
            return res.status(400).json({ msg: 'Email is alrady exist', status: 0, response: 'error' });
        }

        const exitingusername = await Admin.findOne({username: username});
        if(exitingusername){
            return res.status(400).json({ msg: 'Username is alrady exist', status: 0, response: 'error' });
        }

        const bcryptpassword = await bcrypt.hash(password, 10);

        const newAdmin = new Admin({
            email,
            username,
            password: bcryptpassword,
            role: 'Admin'
        });

        const admindata = await newAdmin.save();
        if(admindata){
            return res.status(200).json({ msg: 'Registred successfully', status: 1, response: 'success', AdminData: admindata });
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
        let admindata = await Admin.findOne({ email: req.body.email });
        const payload = {
            email: req.body.email,
            password: req.body.password,
            admindata
        }
        let checkemail = await Admin.findOne({ email: req.body.email });
        if (checkemail) {
            let comparepass = await bcrypt.compare(payload.password, checkemail.password);
            if (comparepass) {
                const token = generateToken(payload);
                res.cookie('admindata-jwt', token);
                return res.status(200).json({ msg: 'Login Successfully', status: 1, response: 'success', Admindata: checkemail });
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
        res.clearCookie('admindata-jwt');
        return res.status(200).json({ msg: 'Logged Out successfully', status: 1, response: 'success' });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.getallteachers = async (req, res) => {
    try {
        const allteacher = await Teacher.find({},{username: 1, email: 1, role: 1}).sort({_id: -1});
        if(allteacher){
            return res.status(200).json({ msg: 'Your all Teachers', status: 1, response: 'success', AllReachers: allteacher });
        }
        else{
            return res.status(400).json({ msg: 'Teachers are not founds!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.getallstudents = async (req, res) => {
    try {
        const allstudent = await Student.find({},{username: 1, email: 1, role: 1}).sort({_id: -1});
        if(allstudent){
            return res.status(200).json({ msg: 'Your all Students', status: 1, response: 'success', AllStudent: allstudent });
        }
        else{
            return res.status(400).json({ msg: 'Students are not founds!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}