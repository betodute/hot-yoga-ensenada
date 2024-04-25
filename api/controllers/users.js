const mongoose = require('mongoose');
var express = require('express');
const router = express.Router();
const transporter = require("../utilities/emailer");
const generateToken = require('../utilities/generateToken');
router.use(express.json());
const User = require('../models/user');

// Register a new user
const passport = require('passport');
const { loginUser } = require('./users');
var LocalStrategy = require('passport-local')

module.exports.registerUser = async (req, res) => {
  const existingEmail = await User.findOne({ email: req.body.regUserEmail });

  if (existingEmail) {
    console.log("error", "An account is already registered with this email");
    return res.redirect("/auth");
  }

  try {
    const newUser = new User({
      name: req.body.regUserName,
      phonenumber: req.body.regPhoneNumber,
      email: req.body.regUserEmail,
      username: req.body.regUserEmail,
      emailtoken: generateToken(),
      verified: false,
      active: false
    });

    const userPassword = req.body.regUserPassword;

    // Register the user
    const registeredUser = await User.register(newUser, userPassword);

    // Construct user object to send back in the response
    const userToSend = {
      id: registeredUser._id, // Assuming MongoDB generates _id for the user
      name: registeredUser.name,
      email: registeredUser.email,
      // Include other properties you want to send back to the client
    };

    const mailOptions = {
      from: 'contact@betodute.com <contact@betodute.com>',
      to: req.body.regUserEmail,
      subject: "Welcome to Hot Yoga Ensenada",
      html: `<p>Tu código de verificación es <span style="font-size: larger; font-weight: bold;">${registeredUser.emailtoken}</span><br></p>`
    };

    // Send the verification email
    const info = await transporter.sendMail(mailOptions);
    console.log('Message Sent: ' + info.messageId);

    // Respond back with the user object
    res.status(200).json(userToSend);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.verifyEmail = async (req, res, next) => {
  try {
    const verifyToken = req.headers.verifytoken;
    console.log(req.headers.verifytoken)
    const user = await User.findOne({ emailtoken: verifyToken });

    if (!user) {
      return res.status(404).json({ message: 'Invalid token. User not found.' });
    }

    user.verified = true;
    await user.save();
    // Login user after registration using passport helper method
    req.login(user, function (err) {
      if (err) {
        console.log('Error logging in after registration:', err);
        return res.status(400).json({ message: 'Error logging in' });
      }
      console.log('User logged in successfully after registration:', user.username);
      console.log('Session ID:', req.sessionID);
    });

    res.json({response: 'success'});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports.loginUser = async (req, res, next) => {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      console.log('Error during authentication:', err);
      return res.status(400).json({ message: 'Error during authentication' });
    }
    if (!user) {
      console.log('Authentication failed:', info.message);
      return res.status(401).json({ message: info.message });
    }
    // If authentication is successful, you can access the authenticated user via req.user
    req.login(user, function (err) {
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

module.exports.logout = async (req, res) => {
  try {
    req.logout(function (err) {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      // Send response after successful logout
      return res.status(200).json({ message: 'Logged out successfully' });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports.forgot = async (req, res) => {
  try {

    const forgotemail = req.headers.forgotpassemail;
    console.log(forgotemail, "this is data type:", typeof forgotemail)
    const user = await User.findOne({ email: forgotemail });

    if (!user) {
      throw new Error("No user found with this email address");
    }

    if (!user.verified) {
      throw new Error(
        "Please verify your account before resetting the password"
      );
    }

    const forgotToken = generateToken();
    const forgotLink = `http://localhost:9000/user/changepass/${forgotToken}`;

    const mailOptions = {
      from: 'contact@betodute.com <contact@betodute.com>',
      to: forgotemail,
      subject: "Hot Yoga Ensenada",
      html: `<h3>Click <a href="${forgotLink}">aquí</a> para restablecer tu contraseña. </h3>`
    };

    await User.updateOne(
      { email: forgotemail },
      { $set: { forgottoken: forgotToken } }
    );

    const info = await transporter.sendMail(mailOptions);
    console.log('Message Sent: ' + info.messageId);

    // sending a custom json object with a string to change authmode on the Auth.js page

    return res.status(200).json({ authMode: "verifyForgotToken" })


  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports.forgotToken = async (req, res, next) => {
  try {
    console.log("hit forgotToken", req.params.token)

    const forgotToken = req.headers.Forgottoken;
    const user = await User.findOne({ forgottoken: forgotToken });

    if (!user) {
      return res.status(404).json({ message: 'Invalid token. User not found.' });
    }

    await user.save();
    return res.status(200).json({ authMode: "renderNewPassword" })

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports.changePass = async (req, res, next) => {
  try {
    console.log("hit change pass", req.params.token)

    const forgotToken = req.params.token;
    const user = await User.findOne({ forgottoken: forgotToken });

    if (!user) {
      return res.status(404).json({ message: 'Invalid token. User not found.' });
    }

    await user.save();
    return res.status(200).json({ render: "home" })

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};