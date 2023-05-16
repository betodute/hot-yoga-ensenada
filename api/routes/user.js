const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

router.post('/registerUser', userController.registerUser)
router.post('/login', userController.loginUser);
router.get('/:id', userController.findYogi);
router.post('/logout', userController.logout);

module.exports = router;
