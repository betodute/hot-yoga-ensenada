const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
var express = require('express');
const router = express.Router();
const passport = require('passport');  // authentication

router.use(express.json());
const User = require('../models/user');

exports.testRegister = async (req, res) => {
  User.register(
    new User({ 
      name: req.body.regUserName,
      phonenumber: req.body.regPhoneNumber,
      email: req.body.regUserEmail, 
      username: req.body.regUserEmail,
      active: false 
    }), req.body.regUserPassword, function(err, user) {
      if (err) {
        console.log('Error: ' + err);
        res.status(400).json({message: 'Error registering user'});
      }
      else {
        console.log('User registered successfully: ' + user.username);
        console.log(user)
        res.status(200).json(user)
      }
    }
  );
};


exports.createUser = async (req, res) => {
  console.log(req.body)

  const user = new User ({
    name: req.body.regUserName,
    phonenumber: req.body.regPhoneNumber,
    email: req.body.regUserEmail,
    password: req.body.regUserPassword
  })
  
  try {
    const userToSave = await user.save();
    res.status(200).json(userToSave);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }

}

