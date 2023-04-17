const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const YogaClassSchema = new Schema({
  date: String,
  day: String,
  time: String,
})

const YogaClass = mongoose.model('YogaClass', YogaClassSchema, 'YogaClass');
module.exports = YogaClass