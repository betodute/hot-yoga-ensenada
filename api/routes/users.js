var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Users Get Request: Working Properly');
});

/* POST users listing */
router.post('/', function(req, res, next) {
  res.send('Users Post Request: Working Properly')
})

module.exports = router;
