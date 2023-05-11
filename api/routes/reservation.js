const express = require('express');
const router = express.Router();
router.use(express.json());
const reservationController = require('../controllers/reservations');

router.post('/', reservationController.createReservation)
router.get('/', reservationController.getReservations)

module.exports = router;