const express = require('express');
const router = express.Router();
router.use(express.json());
const userController = require('../controllers/users');


/* POST Users */
router.post('/', userController.createUser)

module.exports = router;
