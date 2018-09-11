const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const multer = require('multer');
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');
const connection = require('./config/connection');
const routes = require('./routes/app');

app.use('/', routes);
//setting template engine
app.set('view engine', 'ejs');

//setting bodyparser
app.use(bodyparser.urlencoded({extended: true}));

app.listen(5000, function () {
	console.log('Listening to port 5000');
});