const User = require('../models/user');
const mongoose = require('mongoose');

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

mongoose.connect('mongodb://localhost:27017/hot_yoga', { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Connected to MongoDB!');
  }
});
