const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
router.use(express.json());

// Importing User Schema from Models Directory
const User = require('../models/user');

// Importing the .env file using the NPM Package "DotEnv"
require('dotenv').config();
const mongoString = process.env.DATABASE_URL

// Connecting to MongoDB and Printing Error or Confirmation
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on('error', (error) => {
  console.log(error)
});
database.once('connected', () => {
  console.log('Database Connected');
});

/* GET Users */
router.get('/', (req, res) => {
  res.send('Users Get Request is Working Properly');
});

/* POST Users */
router.post('/', async (req, res) => {
  const user = new User ({
    name: req.body.regUserName,
    phonenumber: req.body.regPhoneNumber,
    email: req.body.regUserEmail,
    password: req.body.regUserPassword
  })

  try{
    const userToSave = await user.save();
    res.status(200).json(userToSave)
  }
  catch(error){
    res.status(400).json({message: error.message})
  }

})

module.exports = router;
