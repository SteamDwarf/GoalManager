const express = require('express');
const router = express.Router();
const goalsController = require('../controllers/goals.controller');

router.route('/')
    .get(goalsController.getAllGoals)
    .post(goalsController.createGoal)

router.route('/:id')
    .put(goalsController.updateGoal)
    .delete()

module.exports = router;