const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
router.use(express.json());

//Importing the .env file using the NPM Package "DotEnv"
require('dotenv').config();
const mongoString = process.env.DATABASE_URL

// Importing Model
const User = require('../models/user');

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('Users Get Request is Working Properly');
});

/* POST users listing */
router.post('/', async (req, res) => {
  const user = new User ({
    name: req.body.regUserName,
    phonenumber: req.body.regPhoneNumber,
    email: req.body.regUserEmail,
    password: req.body.regUserPassword
  })

  try{
    const dataToSave = user.save();
    res.status(200).json(userToSave)
  }
  catch(error){
    res.status(400).json({message: error.message})
  }
})


module.exports = router;
