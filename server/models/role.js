/*=========================
Name: Brittany Dockter
Date: April 20, 2020
Assignment: role.js
Description: create a roleSchema for user roles
==========================*/

const mongoose = require('mongoose');

// role schema
let roleSchema = mongoose.Schema({
    text: {type: String, unique: true, dropDups: true}
});

// export for public use
module.exports = mongoose.model('Roles', roleSchema);
