const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
router.use(express.json());
const YogaClass = require('../models/yogaclass');

exports.createYogaClass = async (req, res) => {
  const yogaclass = new YogaClass ({
    date: req.body.date,
    day: req.body.day,
    time: req.body.time
  });

  try {
    const yogaClassToSave = await yogaclass.save();
    res.status(200).json(yogaClassToSave);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  
};