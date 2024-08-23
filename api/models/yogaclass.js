const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const YogaClassSchema = new Schema({
  date: String,
  day: String,
  time: String,
  teacher: String,
  yogaType: String,
  active: Boolean,
})

const YogaClass = mongoose.model('YogaClass', YogaClassSchema, 'YogaClass');
module.exports = YogaClass