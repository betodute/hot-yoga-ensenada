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
var LocalStrategy = require('passport-local');

module.exports.registerUser = async (req, res) => {
  const existingEmail = await User.findOne({ email: req.body.regUserEmail });

  if (existingEmail) {
    console.log("error", "An account is already registered with this email");
    return res.redirect("/auth");
  }

  const newToken = generateToken()

  try {
    const newUser = new User({
      name: req.body.regUserName,
      phonenumber: req.body.regPhoneNumber,
      email: req.body.regUserEmail,
      username: req.body.regUserEmail,
      token: newToken,
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
      email: registeredUser.email
      // Include other properties you want to send back to the client
    };

    const mailOptions = {
      from: 'contact@betodute.com <contact@betodute.com>',
      to: req.body.regUserEmail,
      subject: "Bienvenide a Hot Yoga Ensenada",
      html: `<p>Tu código de verificación es <span style="font-size: larger; font-weight: bold;">${registeredUser.token}</span><br></p>`
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

module.exports.verifyToken = async (req, res, next) => {
  try {
    const verifyToken = req.headers.verifytoken;
    const verifyType = req.headers.verifytype;

    console.log(req.headers.verifytoken)
    console.log(req.headers.verifytype)
    
    const user = await User.findOne({ token: verifyToken });

    console.log('this is the user')
    console.log(user)

    if (!user) {
      return res.status(404).json({ message: 'Invalid token. User not found.' });
    }

    user.verified = true;
    await user.save();

    // The following code checks verification type, if it is to changepass
    // the user should NOT be logged in, if it is to verify the email then the user is
    // logged in

    if (verifyType === 'newPass') {
      console.log('hit verifyType conditional')
      return res.json({response: 'success', user: user});
    }

    // Login user after registration using passport helper method
    req.login(user, function (err) {
      if (err) {
        console.log('Error logging in after registration:', err);
        return res.status(400).json({ message: 'Error logging in' });
      }
      console.log('User logged in successfully after registration:', user.username);
      console.log('Session ID:', req.sessionID);
    });

    res.json({response: 'success', user: user});

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
    console.log('this is the user object from the passport.auth method', user)
    console.log("user authentication with passport succesful here is the info:", info)
    // If authentication is successful, you can access the authenticated user via req.user
    req.login(user, function (err) {
      if (err) {
        console.log('Error logging in:', err);
        return res.status(400).json({ message: 'Error logging in' });
      }
      console.log('User logged in successfully:', user.username);
      console.log(req.session)
      console.log('Session ID:', req.sessionID);
      return res.status(200).json(user);
    });
  })(req, res, next);
};

module.exports.logout = async (req, res) => {
  try {
    console.log("hit back end logout method");
    console.log(req.session);
    console.log('Session ID:', req.sessionID);

    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      // Destroy the session
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to destroy session' });
        }

        return res.status(200).json({ message: 'Logged out successfully' });
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.getCurrentUser = (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
};

module.exports.forgot = async (req, res) => {
  console.log("hit forgot backend");
  try {
    const forgotemail = req.headers.forgotpassemail;
    let user = await User.findOne({ email: forgotemail })

    if (!user) {
      throw new Error("No user found with this email address");
    }

    if (!user.verified) {
      throw new Error(
        "Please verify your account before resetting the password"
      );
    }

    const token = generateToken();

    const mailOptions = {
      from: 'contact@betodute.com <contact@betodute.com>',
      to: forgotemail,
      subject: "Restablece Contraseña",
      html: `<p>Tu código de verificación es <span style="font-size: larger; font-weight: bold;">${token}</span><br></p>`
    };

    await User.updateOne(
      { email: forgotemail },
      { $set: { token: token } }
    );

    const info = await transporter.sendMail(mailOptions);
    console.log('Message Sent: ' + info.messageId);

    // Re-fetch the user to get the updated token
    user = await User.findOne({ email: forgotemail });

    // sending a custom json object with the updated user and authMode
    console.log(user);
    return res.status(200).json({ authMode: "renderNewPassword", user: user });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}


module.exports.changePass = async (req, res, next) => {
  try {
    const verifyToken = req.headers.verifytoken;
    const newUserPass = req.headers.newpasswordone

    const user = await User.findOne({ token: verifyToken });

    if (!user) {
      return res.status(404).json({ message: 'Invalid token. User not found.' });
    }
    
    // Set the new password
    await user.setPassword(newUserPass);
    
    // Save the updated user
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

    res.json({response: 'success', user: user});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};