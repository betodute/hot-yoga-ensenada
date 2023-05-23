const Reservation = require('../models/reservation');

exports.createReservation = async (req, res) => {
  const { userID, yogaClassID } = req.body;

  try {
    // Check if a reservation already exists with the same userID and yogaClassID
    const existingReservation = await Reservation.findOne({ userID, yogaClassID });

    if (existingReservation) {
      // If a duplicate reservation is found, return an error response
      return res.status(409).json({ message: 'Duplicate reservation found.' });
    }

    const newReservation = new Reservation({
      userID,
      yogaClassID
    });

    const reservationToSave = await newReservation.save();
    res.status(200).json(reservationToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({});
    res.status(200).json(reservations);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteReservation = async (req, res) => {
  const { userID, yogaClassID } = req.body;

  try {
    // Find and remove the reservation based on the userID and yogaClassID
    const canceledReservation = await Reservation.findOneAndRemove({ userID, yogaClassID });

    if (canceledReservation) {
      res.status(200).json({ message: 'Reservation canceled successfully.' });
    } else {
      res.status(404).json({ message: 'Reservation not found.' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
