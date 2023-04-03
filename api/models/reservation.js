const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
  userID: String,
  classID: String
})

const Reservation = mongoose.model('Reservation', ReservationSchema);
module.exports = Reservation