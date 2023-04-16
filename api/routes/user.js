const express = require('express');
const router = express.Router();
const passport = require('passport');  // Authentication: Identity Check
const connectEnsureLogin = require('connect-ensure-login');// Authorization: Jurisdiction
const userController = require('../controllers/users');
router.use(express.json());


router.post('/registerUser', userController.registerUser)
router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), userController.loginUser);
router.get('/dashboardUser', connectEnsureLogin.ensureLoggedIn(), userController.dashboardUser);
router.get('/homeUser', connectEnsureLogin.ensureLoggedIn(), userController.homeUser); 
router.get('/logout', userController.logoutUser);


module.exports = router;
