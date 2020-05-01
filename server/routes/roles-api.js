/*=========================
Name: Brittany Dockter, Justin Singleton, Gabriel Sanchez
Date: April 20, 2020
Assignment: roles API's
Description: all API's used for roles
==========================*/

const express = require('express');
const Roles = require('../models/role');

const router = express.Router();

//Find all roles
router.get('/', function(req, res, next) {
  Roles.find({}, function(err, roles) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(roles);
      res.json(roles);
    }
  })
});

//Find by ID
router.get('/:roleId', function(req, res, next) {
  Roles.findOne({'_id': req.params.roleId}, function(err, roles) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(roles);
      res.json(roles);
    }
  })
});

//Create Role
router.post('/', function(req, res, next) {
  let r = {
    text: req.body.text
  };

  Roles.create(r, function(err, role) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(role);
      res.json(role);
    }
  })
});

//Update Role
router.put('/:roleId', function(req, res, next) {
  Roles.findOne({'_id': req.params.roleId}, function(err, role) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(role);

      role.set({
        text: req.body.text
      });

      role.save(function(err, role) {
        if (err) {
          console.log(err);
          return next(err);
        } else {
          console.log(role);
          res.json(role);
        }
      })
    }
  })
});

// Delete Role
router.delete('/:roleId', function(req, res, next) {
  Roles.findOne({'_id': req.params.roleId}, function(err, role) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(role);
      res.json(role);
    }
  })
});

module.exports = router;
