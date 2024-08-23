const express = require('express');
const router = express.Router();
router.use(express.json());
const reservationController = require('../controllers/reservations');

router.post('/', reservationController.createReservation)
router.get('/', reservationController.getReservations)
// remember that the following is a post request because it hides the userID in the http:body
// get request only allow http url params to be sent
router.get('/admin', reservationController.getAdmin)
router.post('/user', reservationController.getUserReservations)
router.put('/:id', reservationController.editReservation)
router.delete('/', reservationController.deleteReservation)

module.exports = router;