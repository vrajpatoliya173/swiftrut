const Exam = require('../models/exam.model');
const Quiz = require('../models/quiz.model');

module.exports.getquiz = async (req, res) => {
    try {
        const quiz = await Quiz.find().select('title description question_list');
        if(quiz){
            return res.status(200).json({ msg: 'Your Quiz', status: 1, response: 'success', Quiz: quiz });
        }
        else{
            return res.status(400).json({ msg: 'Quiz not found!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.giveExam = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if(!quiz){
            return res.status(400).json({ msg: 'Quiz not found!!', status: 0, response: 'error' });
        }
        
        let score = 0;
        const useranswers = req.body.answers;

        const quizanswer = await Quiz.findById(req.params.id).select('answers');
        quizanswer.answers.forEach((answers, index) => {
            const useranswer = parseInt(useranswers[index], 10);
            if(useranswer === answers){
                score++;
            }
        });

        const useraaswers = req.body.answers.map(answer => parseInt(answer, 10));

        if(score < 10){
            req.body.result = 'Fail'
        }
        else{
            req.body.result = 'Pass'
        }

        const exam = await new Exam({
            answers: useraaswers,
            score,
            result: req.body.result,
            userId : req.user._id,
            quizId: req.params.id
        })
        const result = await exam.save();
        if(result){
            return res.status(200).json({ msg: 'Exam is successfully submmited', status: 1, response: 'success' });
        }
        else{
            return res.status(400).json({ msg: 'Exam is not submmited!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.getexamresult = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if(!quiz){
            return res.status(400).json({ msg: 'Quiz not found!!', status: 0, response: 'error' });
        }
        const exam = await Exam.findOne({quizId: req.params.id,userId: req.user._id}).select('score result');

        if(exam){
            return res.status(200).json({ msg: 'Your exam result', status: 1, response: 'success', ExamResult: exam });
        }
        else{
            return res.status(400).json({ msg: 'Exam result not found!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}