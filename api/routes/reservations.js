const express = require('express');
const router = express.Router();
router.use(express.json());
const reservationController = require('../controllers/reservations');

router.post('/', reservationController.createReservation)

module.exports = router;