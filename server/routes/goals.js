const express = require('express');
const router = express.Router();
const goalsController = require('../controllers/goalsController');

router.route('/')
    .get(goalsController.getAllGoals)
    .post(goalsController.createGoal)

router.route('/:id')
    .put(goalsController.updateGoal)
    .delete()

module.exports = router;