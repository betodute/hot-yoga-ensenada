const express = require('express');
const router = express.Router();
const passport = require('passport');  // Authentication: Identity Check
const connectEnsureLogin = require('connect-ensure-login');// Authorization: Jurisdiction
const userController = require('../controllers/users');
router.use(express.json());

/* Post New User */
router.post('/registerUser', userController.registerUser)

/* Auth */
router.get('/dashboardUser', connectEnsureLogin.ensureLoggedIn(), userController.dashboardUser);
router.get('/homeUser', connectEnsureLogin.ensureLoggedIn(), userController.homeUser); 
router.get('/logout', userController.logoutUser);
router.post('/login', passport.authenticate('local', { failureRedirect: '/registerUser' }),  userController.loginUser);

module.exports = router;
