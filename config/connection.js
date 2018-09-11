const express = require('express');
const mongoose = require('mongoose');
const url = "mongodb://localhost/hbflempire";

const conn = mongoose.connect(url, function (err, db) {
	if (err) {
		console.log('error');
	} else {
		console.log('connected');
	}
});

module.exports = conn