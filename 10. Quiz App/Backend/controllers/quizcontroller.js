const Quiz = require('../models/quiz.model');
const moment = require('moment');

module.exports.createquiz = async (req, res) => {
    try {
        req.body.createAt = moment().format('LLL');
        req.body.updateAt = moment().format('LLL');
        const createquiz = await Quiz.create(req.body);
        if(createquiz){
            return res.status(200).json({ msg: 'Quiz created successfully', status: 1, response: 'success', YourQuiz: createquiz });
        }
        else{
            return res.status(400).json({ msg: 'Quiz is not created!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.getallquiz = async (req, res) => {
    try {
        const quizdata = await Quiz.find().sort({_id: -1});
        if(quizdata.length === 0){
            return res.status(400).json({ msg: 'Quiz are not found!!', status: 0, response: 'error' });
        }
        return res.status(200).json({ msg: 'Your Quiz', status: 1, response: 'success', AllQuiz: quizdata });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.getquizbyid = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if(quiz){
            return res.status(200).json({ msg: 'Your Quiz', status: 1, response: 'success', Quiz: quiz });
        }
        else{
            return res.status(400).json({ msg: 'Quiz is not found!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.updatequiz = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id); 
        if(quiz){
            req.body.updateAt = moment().format('LLL');
            const updatequiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {new: true});
            if(updatequiz){
                return res.status(200).json({ msg: 'Quiz updated successfully', status: 1, response: 'success', UpdatedQuiz: updatequiz });
                }
            else{
                return res.status(400).json({ msg: 'Quiz is not updated!!', status: 0, response: 'error' });
            }
        }
        else{
            return res.status(400).json({ msg: 'Quiz is not found!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.removequiz = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if(quiz){
            const rmvquiz = await Quiz.findByIdAndDelete(req.params.id);
            if(rmvquiz){
                return res.status(200).json({ msg: 'Quiz is deleted successfully', status: 1, response: 'success' });
            }
            else{
                return res.status(400).json({ msg: 'Quiz is not deleted!!', status: 0, response: 'error' });
            }
        }
        else{
            return res.status(400).json({ msg: 'Quiz is not found!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

