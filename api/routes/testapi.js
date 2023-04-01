var express = require('express');
var router = express.Router();

router.use(express.json());

router.get('/', function(req, res) {
    res.send('Test API Route is Working Properly')
});

module.exports = router;