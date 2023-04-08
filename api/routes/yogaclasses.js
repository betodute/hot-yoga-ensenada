const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
router.use(express.json());

// Importing YogaClass Schema from Models Directory
const YogaClass = require('../models/yogaclass');

// Importing the .env File Using the NPM Package "DotEnv"
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

/* POST YogaClasses */ 
router.post('/', async (req, res) => {
  const yogaclass = new YogaClass ({
    date: req.body.date,
    day: req.body.day,
    time: req.body.time
  })

  try{
    const yogaClassToSave = await yogaclass.save();
    res.status(200).json(yogaClassToSave)
  }
  catch(error){
    res.status(400).json({message: error.message})
  }
})

module.exports = router;
