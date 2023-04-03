var express = require('express');
var router = express.Router();

router.use(express.json());

router.get('/', function(req, res) {
    console.log("Hit Get Route")
});

module.exports = router;