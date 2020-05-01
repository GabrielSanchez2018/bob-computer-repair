/*=========================
Name: Brittany Dockter, Justin Singleton, Gabriel Sanchez
Date: April 16, 2020
Assignment: session API
Description: all API's used for sessions
==========================*/

const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const router = express.Router();

//User Sign-in
router.post('/signin', function(req, res, next) {
  console.log(req.body);
  User.findOne({'username': req.body.username}, function(err, user) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(user);

      if(user) {
        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (passwordIsValid) {
          res.status(200).send({
            type: 'success',
            auth: true,
            username: user.username,
            time_stamp: new Date()
          })
        } else {
          console.log(`The password for username: ${req.body.username} is invalid.`);
          res.status(401).send({
            type: 'error',
            text: 'Invalid username/password, please try again.',
            auth: false,
            time_stamp: new Date()
          })
        }
      }
    }
  })
});

// Register User
router.post('/register', function(req, res, next) {
  User.findOne({'username': req.body.username}, function(err, user) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      if (!user) {
        let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);

        let u = {
          username: req.body.username,
          password: hashedPassword,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          phoneNumber: req.body.phoneNumber,
          address: req.body.address,
          email: req.body.email,
          securityQuestion: req.body.securityQuestion
        };

        User.create(u, function(err, newUser) {
          if (err) {
            console.log(err);
            return next(err);
          } else {
            console.log(newUser);

            res.status(200).send({
              type: 'success',
              auth: true,
              username: newUser.username,
              time_stamp: new Date()
            })
          }
        })
      } else {
        console.log(`The requested UserName: ${req.body.username} has already been registered with the system. Please pick a new username.`);
        res.status(500).send({
          type: 'error',
          text: `The requested UserName: ${req.body.username} has already been registered with the system. Please pick a new username.`,
          auth: false,
          time_stamp: new Date()
        })
      }
    }
  })
});

// Verify User
router.get('/verify/users/:username', function( req, res, next) {
  User.findOne({'username': req.params.username}, function(err, user) {
      if (err) {
          console.log(err);
          return next(err);
      } else {
          console.log(user);
          res.json(user);
      }
  })
});

//Verify Security Questions
router.post('/verify/users/:username/security-questions', function( req, res, next) {
  const answerToSecurityQuestion1 = req.body.answerToSecurityQuestion1;
  console.log(answerToSecurityQuestion1);

  const answerToSecurityQuestion2 = req.body.answerToSecurityQuestion2;
  console.log(answerToSecurityQuestion2);

  const answerToSecurityQuestion3 = req.body.answerToSecurityQuestion3;
  console.log(answerToSecurityQuestion3);

  User.findOne({'username': req.params.username}, function(err, user) {
      if (err) {
          console.log(err);
          return next(err);
      } else {
          console.log(user);

          let answer1IsValid = answerToSecurityQuestion1 === user.securityQuestion[0].answer;
          console.log(answer1IsValid);

          let answer2IsValid = answerToSecurityQuestion2 === user.securityQuestion[1].answer;
          console.log(answer2IsValid);

          let answer3IsValid = answerToSecurityQuestion3 === user.securityQuestion[2].answer;
          console.log(answer3IsValid);

          if (answer1IsValid && answer2IsValid && answer3IsValid) {
            res.status(200).send({
              type: 'success',
              auth: true
            })
          } else {
            res.status(200).send({
              type: 'error',
              auth: false
            })
          }
      }
  })
});

// Reset Password
router.put('/users/:username/reset-password', function(req, res, next) {
  const password = req.body.password;

  User.findOne({'username': req.params.username}, function(err, user) {
      if (err) {
          console.log(err);
          return next(err);
      } else {
          console.log(user);

          let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);

          user.set({
              password: hashedPassword
          });

          user.save(function (err, savedUser) {
              if (err) {
                  console.log(err);
                  return next(err);
              } else {
                  console.log(savedUser);
                  res.json(savedUser);
              }
          })
      }
  })
});

module.exports = router;
