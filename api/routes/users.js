const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
// const userController = require('../controllers/users');

router.use(express.json());


/* GET users listing. */
router.get('/', (req, res) => {
  res.send('Users Get Request is Working Properly');
});

/* POST users listing */
router.post('/', (req, res) => {
  let regUserData = req.body
  console.log("Here is the user's data", regUserData);
  res.json(regUserData);
})


module.exports = router;
