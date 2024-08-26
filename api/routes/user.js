const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

router.get('/', userController.getAllUsers);
router.post('/registeruser', userController.registerUser);
router.get('/verifytoken', userController.verifyToken);
router.post('/login', userController.loginUser);
// router.get('/:id', userController.findYogi);
router.delete('/logout', userController.logout);
router.get('/current_user', userController.getCurrentUser);
router.get('/forgot', userController.forgot);
router.get('/changepass', userController.changePass);

module.exports = router;
