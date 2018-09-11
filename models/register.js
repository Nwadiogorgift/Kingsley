const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating a schema used for storing registration
const registerSchema = new Schema({
	name: {
		type: String
	},
	email: {
		type: String
	}, 
	password: {
		type: String
	},
	confpassword: {
		type: String
	},
	check: {
		type: String
	},
	type: {
		type: String
	}
});

const register = mongoose.model('register', registerSchema);

//exporting the model
module.exports = register