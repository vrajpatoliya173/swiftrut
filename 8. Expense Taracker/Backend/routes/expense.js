const express = require('express');
const expensectrl = require('../controllers/expensecontroller');
const Expense = require('../models/expense.model');

const routes = express.Router();

routes.post('/createExpense', expensectrl.createExpense);
routes.get('/getallExpense', expensectrl.getallExpense);
routes.put('/updateExpense/:id', expensectrl.updateExpense);
routes.delete('/removeExpense/:id', expensectrl.removeExpense);
routes.get('/getTotaleExpensePerMonth', expensectrl.getTotaleExpensePerMonth);
routes.get('/getCategoryWiseExpenses', expensectrl.getCategoryWiseExpenses);
routes.post('/uploadcsvfile', Expense.uploadfile, expensectrl.uploadcsvfile);
routes.get('/expenseBydate', expensectrl.expenseBydate);

module.exports = routes;