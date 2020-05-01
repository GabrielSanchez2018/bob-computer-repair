/*=========================
Name: Justin Singleton
Date: April 5, 2020
Assignment: user.js
Description: user model for user data fields
==========================*/

const mongoose = require('mongoose');

let securityQuestions = mongoose.Schema({
  questionId: {type: String},
  answer: {type: String}
});

let userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true, dropDups: true},
  password: {type: String, required: true},
  firstname: {type: String},
  lastname: {type: String},
  phoneNumber: {type: String},
  address: {type: String},
  email: {type: String},
  isDisabled: {type: Boolean, default: false},
  role: {type: String, default: 'standard'},
  securityQuestion: [securityQuestions],
  date_created: {type: Date, default: new Date()},
  date_modified: {type: Date}
});

module.exports = mongoose.model('User', userSchema, 'users');
