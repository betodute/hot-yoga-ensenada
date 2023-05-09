const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
var express = require('express');
const router = express.Router();
const passport = require('passport');
router.use(express.json());
const User = require('../models/user');


// Register a new user
module.exports.registerUser = async (req, res) => {
  const newUser = new User({
    name: req.body.regUserName,
    phonenumber: req.body.regPhoneNumber,
    email: req.body.regUserEmail,
    username: req.body.regUserEmail,
    active: false
  });

  User.register(newUser, req.body.regUserPassword, function(err, user) {
    if (err) {
      console.log('Error: ' + err);
      res.status(400).json({ message: 'Error registering user' });
    } else {
      console.log('User registered successfully: ' + user.username);
      res.status(200).json(user);
    }
  });
};

module.exports.loginUser = async (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    console.log("Hit Login Function This is the User", user)
    if (err) {
      console.log('Error during authentication:', err);
      return res.status(400).json({ message: 'Error during authentication' });
    }
    if (!user) {
      console.log('Authentication failed:', info.message);
      return res.status(401).json({ message: info.message });
    }
    console.log("hit before login", user);
    // If authentication is successful, you can access the authenticated user via req.user
    req.login(user, function(err) {
      if (err) {
        console.log('Error logging in:', err);
        return res.status(400).json({ message: 'Error logging in' });
      }
      console.log('User logged in successfully:', user.username);
      return res.status(200).json(user);
    });
  })(req, res, next);
};



module.exports.logout = async (req, res) => {
  console.log("hit logout in the controller")
  req.logout(function(err) {
    if (err) { 
      return res.status(500).json({ error: 'Internal Server Error' }); 
    }
    console.log("logout successful")
    return res.status(200).json({ message: 'Logged out successfully' });
  });
}