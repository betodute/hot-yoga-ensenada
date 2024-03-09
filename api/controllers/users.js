const mongoose = require('mongoose');
var express = require('express');
const router = express.Router();
const passport = require('passport');
const transporter = require("../utilities/emailer");
const emailToken = require('../utilities/emailToken');
router.use(express.json());
const User = require('../models/user');



// Register a new user
module.exports.registerUser = async (req, res) => {
  
  try {
    const newUser = new User({
      name: req.body.regUserName,
      phonenumber: req.body.regPhoneNumber,
      email: req.body.regUserEmail,
      username: req.body.regUserEmail,
      emailtoken: emailToken(),
      active: false
    });

    const userPassword = req.body.regUserPassword

    const mailOptions = {
      from: 'contact@betodute.com <contact@betodute.com>',
      to: req.body.regUserEmail,
      subject: "welcome to hot yoga ensenada",
      html: `<p>Click <a href="http://localhost:3000/user/verifyemail/${emailToken()}">here</a> to verify your email</p>`
    }
    const registeredUser = await User.register(newUser, userPassword);

    const info = await transporter.sendMail(mailOptions)
    console.log('Message Sent: ' + info.messageId)
    res.json('/')
 
  } catch (err) {
    console.error(err);
    res.json('/')
  }

};

module.exports.verifyEmail = async (req, res, next) => {
  console.log("OMG")
  console.log(req.params)
}

module.exports.loginUser = async (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      console.log('Error during authentication:', err);
      return res.status(400).json({ message: 'Error during authentication' });
    }
    if (!user) {
      console.log('Authentication failed:', info.message);
      return res.status(401).json({ message: info.message });
    }
    // If authentication is successful, you can access the authenticated user via req.user
    req.login(user, function(err) {
      if (err) {
        console.log('Error logging in:', err);
        return res.status(400).json({ message: 'Error logging in' });
      }
      console.log('User logged in successfully:', user.username);
      console.log('Session ID:', req.sessionID);
      return res.status(200).json(user);
    });
  })(req, res, next);
};

module.exports.findYogi = async (req, res) => {
  const userID = req.params.id;
  try {
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log("this is the user after database return:", user)
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports.logout = async (req, res) => {
  req.logout(function(err) {
    if (err) { 
      return res.status(500).json({ error: 'Internal Server Error' }); 
    }
    return res.status(200).json({ message: 'Logged out successfully' });
  });
}