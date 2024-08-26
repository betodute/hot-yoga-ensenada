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
    date: req.body.yogaDate,
    day: req.body.yogaDay,
    time: req.body.yogaTime,
    teacherID: req.body.teacherID,
    ycTeacherName: req.body.ycTeacherName,
    yogaType: req.body.yogaType,
    active: req.body.classActive
  });

  try {
    const yogaClassToSave = await yogaclass.save();
    res.status(200).json(yogaClassToSave);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.findYogaClass = async (req, res) => {
  const yogaClassID = req.params.id;
  try {
    const yogaClass = await YogaClass.findById(yogaClassID);
    if (!yogaClass) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log("this is the yogaclass after databsase return:", yogaClass)
    res.json(yogaClass);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}