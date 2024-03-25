const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

router.post('/registeruser', userController.registerUser)
router.get('/verifyemail/:token', userController.verifyEmail);
router.post('/login', userController.loginUser);
// router.get('/:id', userController.findYogi);
router.post('/logout', userController.logout);
router.get('/forgot', userController.forgot);
router.get('/changepass/:token', userController.changePass);

module.exports = router;
