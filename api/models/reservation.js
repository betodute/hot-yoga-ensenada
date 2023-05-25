const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
  userID: String,
  yogaClassID: String,
  show: String,
})

const Reservation = mongoose.model('Reservation', ReservationSchema, 'Reservation');
module.exports = Reservation