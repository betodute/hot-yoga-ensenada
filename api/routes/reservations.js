const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
router.use(express.json());

// Import Reservation Schema from Models Directory
const Reservation = require('../models/reservation');

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

/* POST Reservations */
router.post('/', async (req, res) => {
  const reservation = new Reservation ({
    userID: req.body.userID,
    yogaClassID: req.body.yogaClassID
  })

  try{
    const reservationToSave = reservation.save();
    res.status(200).json(reservationToSave)
  }
  catch(error){
    res.status(400).json({message: error.message})
  }
})

module.exports = router;