const express = require('express');
const router = express.Router();
const passport = require('passport');  // authentication
const connectEnsureLogin = require('connect-ensure-login');// authorization
const userController = require('../controllers/users');
router.use(express.json());

/* POST Users */
router.post('/', userController.createUser)

/* TEST REGISTER */
router.get('/testregister', userController.testRegister)

/* AUTH */

router.get('/dashboard', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  res.send(`Hello ${req.user.username}. Your session ID is ${req.sessionID} 
   and your session expires in ${req.session.cookie.maxAge} 
   milliseconds.<br><br>
   <a href="/logout">Log Out</a><br><br>
   <a href="/Home">Members Only</a>`);
});

router.get('/Home', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  res.sendFile(__dirname + '../hot-yoga-ensenada-frontend/src/Home.js');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/' }),  function(req, res) {
	console.log(req.user)
	res.redirect('/dashboard');
});

module.exports = router;
