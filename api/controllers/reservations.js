const Reservation = require('../models/reservation');


exports.createReservation = async (req, res) => {
  console.log('this is what is coming in', req.body)

  const newReservation = new Reservation ({
    userID: req.body.userID,
    yogaClassID: req.body.yogaClassID
  })
  
  try {
    const reservationToSave = await newReservation.save();
    res.status(200).json(reservationToSave);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }


}