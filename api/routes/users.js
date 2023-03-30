const express = require('express');
const router = express.Router();

router.use(express.json());

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('Users Get Request: Working Properly');
});

/* POST users listing */
router.post('/', (req, res) => {
  let regUserData = req.body

  // then send regUserData to Mongo
  res.json(regUserData);
})

module.exports = router;
