const mongoose = require('mongoose');
const ENV_VARS = require('./envVars');

const db = mongoose.connect(
		ENV_VARS.MONGO_URI,
	).then(result => {
		console.log('db is connected succefully');
	})
	.catch(err => {
		console.log(err);
	});

module.exports = db;