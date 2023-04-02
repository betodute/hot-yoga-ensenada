/* const User = require('../models/user');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


router.post("/", (req, res) => {
  
  const user = new User ({
    name: "Marco Antonio Solis",
    phonenumber: "555-555-5555",
    email: "omg@omg",
    password: "omg",
  })

  user.save((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Data saved successfully!');
    }
  });

})

mongoose.connect('mongodb://localhost:27017/hot_yoga'); */
