const bcrypt = require('bcrypt');
const { generateToken } = require('../config/jwt');
const Student = require('../models/student.model');
const Course = require('../models/course.model');
const Submission = require('../models/submition.model');
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

        const exitingemail = await Student.findOne({email: email});
        if(exitingemail){
            return res.status(400).json({ msg: 'Email is alrady exist', status: 0, response: 'error' });
        }

        const exitingusername = await Student.findOne({username: username});
        if(exitingusername){
            return res.status(400).json({ msg: 'Username is alrady exist', status: 0, response: 'error' });
        }

        const bcryptpassword = await bcrypt.hash(password, 10);

        const newUser = new Student({
            email,
            username,
            password: bcryptpassword,
            role: 'Student'
        });

        const studentdata = await newUser.save();
        if(studentdata){
            return res.status(200).json({ msg: 'Registred successfully', status: 1, response: 'success', StudentData: studentdata });
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
        const studentdata = await Student.findOne({email: req.body.email})
        const payload = {
            email: req.body.email,
            password: req.body.password,
            studentdata
        }
        let checkemail = await Student.findOne({ email: req.body.email });
        if (checkemail) {
            let comparepass = await bcrypt.compare(payload.password, checkemail.password);
            if (comparepass) {
                const token = generateToken(payload);
                res.cookie('studentdata-jwt', token);
                return res.status(200).json({ msg: 'Login Successfully', status: 1, response: 'success', StudentData: studentdata });
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
        res.clearCookie('studentdata-jwt');
        return res.status(200).json({ msg: 'Logged Out successfully', status: 1, response: 'success' });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.getenrollmentcourse = async (req, res) => {
    try {
        const enrollmentcourse = await Course.find({enrolledStudents: req.user._id},{title: 1,description: 1,startDate:1,endDate:1,content:1}).sort({_id: -1});
        if(enrollmentcourse){
            return res.status(200).json({ msg: 'Your enrolle course', status: 1, response: 'success', EnrolleCourses: enrollmentcourse });
        }
        else{
            return res.status(400).json({ msg: 'enrolle courses are not founds!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.submission = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if(!course){
            return res.status(400).json({ msg: 'Course is not found!!', status: 0, response: 'error' });
        }
        req.body.course = req.params.id;
        req.body.student = req.user._id;
        req.body.submittedAt = moment().format('LLL');
        const submission = await Submission.create(req.body);
        if(submission){
            return res.status(200).json({ msg: 'Submission is successfully Subbmited', status: 1, response: 'success', Submission: submission });
        }
        else{
            return res.status(400).json({ msg: 'Submission is not Subbmited!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}