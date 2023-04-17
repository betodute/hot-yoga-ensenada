const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
  userID: String,
  yogaClassID: String
})

const Reservation = mongoose.model('Reservation', ReservationSchema, 'Reservation');
module.exports = Reservation