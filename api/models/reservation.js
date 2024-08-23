const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
  userID: String,
  userName: String,
  yogaClassID: String,
  day: String,
  time: String,
  show: String,
})

const Reservation = mongoose.model('Reservation', ReservationSchema, 'Reservation');
module.exports = Reservation