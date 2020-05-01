/*=========================
Name: Brittany Dockter, Justin Singleton, Gabriel Sanchez
Date: April 16, 2020
Assignment: security question API's
Description: all API's used for security questions
==========================*/

const express = require('express');
const SecurityQuestion = require('../models/security-questions');

const router = express.Router();

//Find all questions
router.get('/', function(req, res, next) {
  SecurityQuestion.find({}).where('isDisabled').equals(false).exec(function(err, securityQuestions) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(securityQuestions);
      res.json(securityQuestions);
    }
  })
});

//Find by ID
router.get('/:id', function(req, res, next) {
  SecurityQuestion.findOne({'_id': req.params.id}, function(err, securityQuestion) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(securityQuestion);
      res.json(securityQuestion);
    }
  })
});

//Find by multiple IDs
router.post('/find-by-ids', function(req, res, next) {
  const question1 = req.body.question1;
  const question2 = req.body.question2;
  const question3 = req.body.question3;

  SecurityQuestion.find({
    $or: [
      {'_id': question1},
      {'_id': question2},
      {'_id': question3},
    ]
  }).exec(function(err, securityQuestions) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(securityQuestions);
      res.json(securityQuestions);
    }
  })
});

//Create Security Question
router.post('/', function(req, res, next) {
  let = sq = {
    text: req.body.text
  };

  SecurityQuestion.create(sq, function(err, securityQuestion) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(securityQuestion);
      res.json(securityQuestion);
    }
  })
});

//Update Security Question
router.put('/:id', function(req, res, next) {
  SecurityQuestion.findOne({'_id': req.params.id}, function(err, securityQuestion) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(securityQuestion);
      securityQuestion.set({
        text: req.body.text
      });

      securityQuestion.save(function(err, securityQuestion) {
        if (err) {
          console.log(err);
          return next(err);
        } else {
          console.log(securityQuestion);
          res.json(securityQuestion);
        }
      })
    }
  })
});

//Delete Security Question
router.delete('/:id', function(req, res, next) {
  SecurityQuestion.findOne({'_id': req.params.id}, function(err, securityQuestion) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(securityQuestion);
      if (securityQuestion) {
        securityQuestion.set({
          isDisabled: true
        });
        securityQuestion.save(function(err, savedSecurityQuestion) {
          if(err){
            console.log(err);
            return next(err);
          } else {
            console.log(savedSecurityQuestion);
            res.json(savedSecurityQuestion);
          }
        })
      }
    }
  });
});

module.exports = router;
