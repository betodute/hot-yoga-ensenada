const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
router.use(express.json());

router.post('/registerUser', userController.registerUser)
router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser);


module.exports = router;
