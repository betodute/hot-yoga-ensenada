const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

router.post('/registeruser', userController.registerUser)
router.get('/verifytoken', userController.verifyToken);
router.post('/login', userController.loginUser);
// router.get('/:id', userController.findYogi);
router.post('/logout', userController.logout);
router.get('/forgot', userController.forgot);
router.get('/changepass', userController.changePass);

module.exports = router;
