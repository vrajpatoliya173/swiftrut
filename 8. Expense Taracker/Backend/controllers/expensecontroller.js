const Expense = require('../models/expense.model');
const moment = require('moment');
const momenttime = require('moment-timezone');
const { ObjectId } = require('mongodb');
const fs = require('fs');
const csv = require('csvtojson');

module.exports.createExpense = async (req, res) => {
    try {
        const paymentmethode = ['Cash', 'Credit'];
        req.body.createAt = moment().format('LLL');
        req.body.updateAt = moment().format('LLL');
        req.body.date = momenttime.tz(req.body.date, "DD/MM/YYYY", "India Standard Time");
        req.body.userId = req.user._id;
        if(!paymentmethode.includes(req.body.payment_method)){
            return res.status(400).json({ msg: 'Payment mathode is not accepted!! you enter only: Cash or Credit', status: 0, response: 'error' });
        }
        const createExpense = await Expense.create(req.body);
        if(createExpense){
            return res.status(200).json({ msg: 'Expense create successfully', status: 1, response: 'success', YourExpense: createExpense });
        }
        else{
            return res.status(400).json({ msg: 'Expense is not created!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.getallExpense = async (req, res) => {
    try {
        const allExpense = await Expense.find({userId: req.user._id}).sort({_id: -1});
        if(allExpense){
            return res.status(200).json({ msg: 'Your all Expense', status: 1, response: 'success', AllExpense: allExpense });
        }
        else{
            return res.status(400).json({ msg: 'Expense is not founds!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.updateExpense = async (req, res) => {
    try {
        const expensedata = await Expense.findById(req.params.id);
        const paymentmethode = ['Cash', 'Credit'];
        req.body.updateAt = moment().format('LLL');
        req.body.date = momenttime.tz(req.body.date, "DD/MM/YYYY", "India Standard Time");
        if(!paymentmethode.includes(req.body.payment_method)){
            return res.status(400).json({ msg: 'Payment mathode is not accepted!! you enter only: Cash or Credit', status: 0, response: 'error' });
        }
        if(expensedata){
            const updateExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, {new: true});
            if(updateExpense){
                return res.status(200).json({ msg: 'Expense is updated successfully', status: 1, response: 'success', UpdatedExpense: updateExpense });
            }
            else{
                return res.status(400).json({ msg: 'Expense is not updated!!', status: 0, response: 'error' });
            }
        }
        else{
            return res.status(400).json({ msg: 'Expense is not found!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.removeExpense = async (req, res) => {
    try {
        const rmvexpense = await Expense.findByIdAndDelete(req.params.id);
        if(rmvexpense){
            return res.status(200).json({ msg: 'Expense is removed successfully', status: 1, response: 'success' });
        }
        else{
            return res.status(400).json({ msg: 'Expense is not removed!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.getTotaleExpensePerMonth = async (req, res) => {
    try {
        const Expenses = await Expense.find({userId: req.user._id});
        
        if(Expenses){
            const result = await Expense.aggregate([
                {
                    $match: {
                        userId: { $eq: new ObjectId(req.user._id) }  // Convert to ObjectId
                    }
                },
                {
                    $addFields: {
                        date: { $toDate: "$date" }  // This ensures the 'date' field is converted to a Date type
                    }
                },
                {
                    $project: {
                        month: {$month: "$date"},
                        year: {$year: "$date"},
                        amount: 1
                    }
                },
                {
                    $group: {
                        _id: { year: "$year", month: "$month" },
                        totalExpenses: { $sum: "$amount" }
                    }
                },
                {
                    $sort: { "_id.year": 1, "_id.month": 1 }
                }
            ]);
    
            if(result && result.length > 0){
                return res.status(200).json({ msg: 'Your all ExpensesParMonth ', status: 1, response: 'success', ExpensesParMonth: result });
            }
            else{
                return res.status(400).json({ msg: 'Expenses are not founds per month!!', status: 0, response: 'error' });
            }
        }
        else{
            return res.status(400).json({ msg: 'data not found by userId', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.getCategoryWiseExpenses = async (req, res) => {
    try {
        const result = await Expense.aggregate([
            {
                $match: {
                    userId: { $eq: new ObjectId(req.user._id) }  // Convert to ObjectId
                }
            },
            {
                $group: {
                    _id: "$category",
                    totalAmount: { $sum: "$amount" }
                }
            },
            {
                $sort: { totalAmount: -1 }
            }
        ]);

        if(result){
            return res.status(200).json({ msg: 'Your all CategoryWiseExpenses ', status: 1, response: 'success', CategoryWiseExpenses: result });
        }
        else{
            return res.status(400).json({ msg: 'Expenses are not founds by categorywise!!', status: 0, response: 'error' });
        }

    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.uploadcsvfile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ msg: 'No file uploaded!!', status: 0, response: 'error' });
        }
        const filePath = req.file.path;
        const csvfileremove = (filePath) => {
            fs.unlink(filePath, (err) => {
                 if (err) {
                    console.error(`Error deleting file: ${filePath}`, err);
                } else {
                    console.log(`File successfully deleted: ${filePath}`);
                }
            });
        }

        const expenseData = [];
        csv()
        .fromFile(req.file.path)
        .then(async (rows)=>{
            
            for(var i = 0; i < rows.length; i++){
                expenseData.push({
                    amount: rows[i].amount,
                    category: rows[i].category,
                    payment_method: rows[i].payment_method,
                    description: rows[i].description,
                    date: momenttime.tz(rows[i].date, "DD/MM/YYYY", "India Standard Time"),
                    createAt: moment().format('LLL'),
                    updateAt: moment().format('LLL'),
                    userId: req.user._id,
                })
            };
            const csvdata = await Expense.insertMany(expenseData);
            if(csvdata){
                csvfileremove(filePath);
                return res.status(200).send({ msg: 'CSV processed and file deleted successfully', status: 1, response: 'success', FileData: csvdata });
            }
            else{
                return res.status(400).json({ msg: 'CSV file is not uploaded!!', status: 0, response: 'error' });
            }
        });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}

module.exports.expenseBydate = async (req, res) => {
    try {
        req.body.startDate = momenttime.tz(req.body.startDate, "DD/MM/YYYY", "India Standard Time").startOf('day').toDate();
        req.body.endDate = momenttime.tz(req.body.endDate, "DD/MM/YYYY", "India Standard Time").endOf('day').toDate();

        const start = req.body.startDate;
        const end = req.body.endDate;

        const allExpense = await Expense.find({userId: req.user._id, date: { $gte: start, $lte: end } }).sort({date: 1});
        if(allExpense){
            return res.status(200).json({ msg: 'Your all Expense by Date', status: 1, response: 'success', AllExpense: allExpense });
        }
        else{
            return res.status(400).json({ msg: 'Expense is not founds from this date!!', status: 0, response: 'error' });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing went wrong', status: 0, response: 'error' });
    }
}