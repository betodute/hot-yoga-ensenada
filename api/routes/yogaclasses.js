var express = require('express');
const router = express.Router();
router.use(express.json());
const yogaClassController = require('../controllers/yogaclasses');

router.get('/', yogaClassController.getYogaClasses)
router.post('/', yogaClassController.createYogaClass)

module.exports = router;
