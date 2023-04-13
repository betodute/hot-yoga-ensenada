const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  phonenumber: String,
  email: String,
  password: String
});

UserSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', UserSchema, 'User');
module.exports = User