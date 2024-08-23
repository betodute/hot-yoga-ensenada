const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeacherSchema = new Schema ({
  name: String,
  email: String,
  phoneNumber: String,
  picture: String,
  bio: String,
});

const Teacher = mongoose.model('Teacher', TeacherSchema, 'Teacher');
module.exports = Teacher