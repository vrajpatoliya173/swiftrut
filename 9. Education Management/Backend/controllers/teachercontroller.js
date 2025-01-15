const bcrypt = require('bcrypt');
const { generateToken } = require('../config/jwt');
const Teacher = require('../models/teacher.model');
const Course = require('../models/course.model');
const moment = require('moment');
const Submission = require('../models/submition.model');
const mongoose = require('mongoose');
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

        const exitingemail = await Teacher.findOne({email: email});
        if(exitingemail){
            return res.status(400).json({ msg: 'Email is alrady exist', status: 0, response: 'error' });
        }

        const exitingusername = await Teacher.findOne({username: username});
        if(exitingusername){
            return res.status(400).json({ msg: 'Username is alrady exist', status: 0, response: 'error' });
        }

        const bcryptpassword = await bcrypt.hash(password, 10);

        const newUser = new Teacher({
            email,
            username,
            password: bcryptpassword,
            role: 'Teacher'
        });

        const teacherdata = await newUser.save();
        if(teacherdata){
            return res.status(200).json({ msg: 'Registred successfully', status: 1, response: 'success', TeacherData: teacherdata });
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
        const teacherdata = await Teacher.findOne({email: req.body.email})
        const payload = {
            email: req.body.email,
            password: req.body.password,
            teacherdata
        }
        let checkemail = await Teacher.findOne({ email: req.body.email });
        if (checkemail) {
            let comparepass = await bcrypt.compare(payload.password, checkemail.password);
            if (comparepass) {
                const token = generateToken(payload);
                res.cookie('teacherdata-jwt', token);
                return res.status(200).json({ msg: 'Login Successfully', status: 1, response: 'success', TeacherData: teacherdata });
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
        res.clearCookie('teacherdata-jwt');
        return res.status(200).json({ msg: 'Logged Out successfully', status: 1, response: 'success' });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.getenrolledstudent = async (req, res) => {
    try {
        const assignedcourse = await Course.find({assignedTeacher: req.user._id},{enrolledStudents: 1}).populate("enrolledStudents", "username email role").sort({_id: -1});
        if(assignedcourse){
            return res.status(200).json({ msg: 'Your all assigned courses', status: 1, response: 'success', AssignedCourses: assignedcourse });
        }
        else{
            return res.status(400).json({ msg: 'assigned courses are not founds!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.getassignedcourses = async (req, res) => {
    try {
        const assignedcourse = await Course.find({assignedTeacher: req.user._id}).sort({_id: -1});
        if(assignedcourse){
            return res.status(200).json({ msg: 'Your all assigned courses', status: 1, response: 'success', AssignedCourses: assignedcourse });
        }
        else{
            return res.status(400).json({ msg: 'assigned courses are not founds!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.updatecontent = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        const { content } = req.body;
        if(!course){
            return res.status(400).json({ msg: 'Course is not found!!', status: 0, response: 'error' });
        }

        if(course.assignedTeacher.toString() !== req.user._id){
            return res.status(400).json({ msg: 'Not authorized to modify this course', status: 0, response: 'error' });
        }

        course.content = content;
        const updatedCourse = await course.save();
        if(updatedCourse){
            return res.status(200).json({ msg: 'Teacher is updated content for this course', status: 1, response: 'success', UpdatedCourse: updatedCourse });
        }
        else{
            return res.status(400).json({ msg: 'Teacher is not updated content for this course!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.submissiongrade = async (req, res) => {
    try {
        const student = await Student.findOne({username: req.body.username, email: req.body.email});
        if(!student){
            return res.status(400).json({ msg: 'Student is not found!!', status: 0, response: 'error' });
        }

        const submission = await Submission.findOne({course: req.params.id, student: student._id });
        if(!submission){
            return res.status(400).json({ msg: 'Submission is not found!!', status: 0, response: 'error' });
        }

        submission.grade = req.body.grade;
        const updatesubmission = await submission.save();
        if(updatesubmission){
            return res.status(200).json({ msg: 'Grade is successfully given', status: 1, response: 'success', UpdatedSubmission: updatesubmission });
        }
        else{
            return res.status(400).json({ msg: 'Grade is not given!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}