const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
var express = require('express');
const router = express.Router();
const passport = require('passport');  // authentication
router.use(express.json());
const User = require('../models/user');

exports.registerUser = async (req, res) => {
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
        res.status(200).json(user)
      }
    }
  );
};


exports.dashboardUser = async (req, res) => {

  res.send(`Hello ${req.user.username}. Your session ID is ${req.sessionID} 
  and your session expires in ${req.session.cookie.maxAge} 
  milliseconds.<br><br>
  <a href="/logout">Log Out</a><br><br>
  <a href="/Home">Members Only</a>`)
}

exports.homeUser = async (req, res) => {
  res.redirect('localhost:3000/home')
}

exports.logoutUser = async (req, res) => {
  req.logout();
  res.redirect('/login');
}

exports.loginUser = async (req, res) => {
  console.log(req.user)
	res.send('LOGGED IN');
}

