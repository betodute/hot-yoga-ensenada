const YogaClass = require('../models/yogaclass');

exports.getYogaClasses = async (req, res) => {
  try {
    const yogaClasses = await YogaClass.find({});
    res.status(200).json(yogaClasses);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

exports.createYogaClass = async (req, res) => {
  const yogaclass = new YogaClass ({
    date: req.body.date,
    day: req.body.day,
    time: req.body.time
  });

  try {
    const yogaClassToSave = await YogaClass.save();
    res.status(200).json(yogaClassToSave);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }

};