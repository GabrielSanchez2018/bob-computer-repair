/*=========================
Name: Brittany Dockter
Date: March 31, 2020
Assignment: securityQuestions.js
Description: create a security
question schema for user security
==========================*/

const mongoose = require('mongoose');

// security question schema
let securityQuestionSchema = mongoose.Schema({
    text: {type: String},
    isDisabled: {type: Boolean, default: false}
});

// export for public use
module.exports = mongoose.model('SecurityQuestion', securityQuestionSchema);
