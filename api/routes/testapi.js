var express = require('express');
var router = express.Router();

router.use(express.json());

router.get('/', function(req, res, next) {
    res.send('Test API Route is Working Properly')
});

module.exports = router;