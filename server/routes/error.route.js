const express = require('express');
const router = express.Router();
const errorController = require('../controllers/error.controller');

router.route('/')
    .get(errorController.errorGet);

module.exports = router;