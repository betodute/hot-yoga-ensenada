const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  phonenumber: String,
  email: String,
  username: String,
  password: String,
  token: String,
  verified: Boolean
});

UserSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', UserSchema, 'User');
module.exports = User