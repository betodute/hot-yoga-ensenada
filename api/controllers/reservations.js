const Reservation = require('../models/reservation');


exports.createReservation = async (req, res) => {
  console.log(req.body)

  const Reservation = new Reservation ({
    userID: req.body.userID,
    yogaClassID: req.body.yogaClassID
  })
  
  try {
    const reservationToSave = await Reservation.save();
    res.status(200).json(reservationToSave);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }


}