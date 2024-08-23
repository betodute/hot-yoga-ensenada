const Reservation = require('../models/reservation');
const YogaClass = require('../models/yogaclass');

exports.createReservation = async (req, res) => {
  const { userID, userName, yogaClassID, day, time, show } = req.body;

  try {
    // Check if a reservation already exists with the same userID and yogaClassID
    const existingReservation = await Reservation.findOne({ userID, yogaClassID });

    if (existingReservation) {
      // If a duplicate reservation is found, return an error response
      return res.status(409).json({ message: 'Duplicate reservation found.' });
    }

    const newReservation = new Reservation({
      userID,
      userName,
      yogaClassID,
      day,
      time,
      show
    });

    const reservationToSave = await newReservation.save();
    res.status(200).json(reservationToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getReservations = async (req, res) => {
  console.log("hit the getReservations back end method!");

  try {
    // Find all reservations
    const reservations = await Reservation.find({});
    res.status(200).json(reservations);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUserReservations = async (req, res) => {
  const { userID } = req.body; // Extract userID from the request body
  console.log("hit the getUserReservations back end method!", userID);

  try {
    // Find reservations by userID
    const reservations = await Reservation.find({ userID });
    res.status(200).json(reservations);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAdmin = async (req, res) => {
  const yogaClasses = await YogaClass.find({});
  res.status(200).json(yogaClasses);
}

exports.editReservation = async (req, res) => {
  const reservationID = req.params.id;
  const { show } = req.body;

  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      reservationID,
      { show },
      { new: true }
    );

    if (!updatedReservation) {
      return res.status(404).json({ message: 'Reservation not found.' });
    }

    res.status(200).json(updatedReservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.deleteReservation = async (req, res) => {
  const { userID, yogaClassID } = req.body;

  console.log("hit the back end!",userID, yogaClassID)

  try {
    // Find and remove the reservation based on the userID and yogaClassID
    const canceledReservation = await Reservation.findOneAndDelete({ userID, yogaClassID });

    if (canceledReservation) {
      res.status(200).json({ message: 'Reservation canceled successfully.' });
    } else {
      res.status(404).json({ message: 'Reservation not found.' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
