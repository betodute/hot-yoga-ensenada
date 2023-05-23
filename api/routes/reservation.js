const express = require('express');
const router = express.Router();
router.use(express.json());
const reservationController = require('../controllers/reservations');

router.post('/', reservationController.createReservation)
router.get('/', reservationController.getReservations)
router.delete('/', reservationController.deleteReservation)

module.exports = router;