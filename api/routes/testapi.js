var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('Test API Route is Working Properly')
});

module.exports = router;