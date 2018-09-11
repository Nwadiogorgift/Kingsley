const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const mongoose = require('mongoose');
const register = require('../models/register');

router.use(bodyparser.urlencoded({extended: true}));

router.use(express.static("public"));

//initializing session
router.use(session({
	secret: 'HbflEmpire',
	saveUnitialized: true,
	resave: false
}));

//routing for home page
router.get('/', function (req, res) {
	res.render('index');
});

//routing for about page
router.get('/about', function (req, res) {
	res.render('about');
});

//routing for blog page
router.get('/blog', function (req, res) {
	res.render('blog');
});

//routing for contact page
router.get('/contact', function (req, res) {
	res.render('contact');
});

//routing for signUp page
router.get('/signup', function (req, res) {
	res.render('signup');
});

//routing for contestant page
router.get('/contestant', function (req, res) {
	res.render('contestant');
});


//posting registration details to mongoDB database
router.post('/register', function (req, res) {
	//hashing the inputed password...
	bcrypt.hash(req.body.password, 15, function (err, hash) {
		if (err) {
			console.log('error');
		} else {
			user = "user",
			details = register({
				name: req.body.name,
				email: req.body.email,
				password: hash,
				confpassword: hash,
				check: req.body.checkbox,
				type: user
			});
			// saving all informations above to the database...
			details.save(function (err, result) {
				if (!err) {
					res.render('signup', {
						msg: "You Have Successfully Regsitered Your Account. Kindly Visit Your Email To Activate Your Account."
					});
				} else {
					console.log('error');
				}
			});
		}
	});
});

//Routing for login details of each users
router.post('/login', function (req, res) {
	req.session.email = req.body.email,
	req.session.password = req.body.password,
	req.session.type = req.body.type
	register.findOne({email: req.session.email, type: req.session.type}, function (err, result) {
		if (result) {
			name = result.name,
			email = result.email,
			bcrypt.compare(req.session.password, result.password, function (err, result) {
				if (result) {
					res.render('welcome', {
						name: name,
						email: email
					});
				} else {
					console.log('urrrh');
				}
			});
		} else {
			console.log('error');
		}
		
	});
});

router.get('/voting_rules', function (req, res) {
	if (req.session && req.session.email) {
		res.render('voting_rules');
	} else {
		res.render('signup');
	}
});


router.get('/logout', function (req, res) {
	req.session.destroy();
	res.render('index');
});
module.exports = router;