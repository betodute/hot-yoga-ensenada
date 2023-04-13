const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const User = require('../models/user');


exports.testRegister = async (req, res) => {
  console.log(req.body)
  User.register({ username: 'boocoo', active: false }, 'caneyomgomg');
}

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

