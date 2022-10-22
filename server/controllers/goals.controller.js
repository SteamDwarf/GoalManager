const databaseController = require('../database/dbController');
const { ObjectId } = require('mongodb');
const { response } = require('express');
const Goal = require('../database/goals.cheme');

const getAllGoals = (request, response) => {
    databaseController.getItems("goals", {}).toArray()
        .then(goals => response.status(200).json(goals))
}

const getGoalById = (request, response) => {
    const goalId = request.params.id;

    databaseController.getItem("goals", {"_id": ObjectId(goalId)})
        .then(goal => response.status(200).json(goal));
}


const createGoal = (request, response) => {
    if(!request.body?.text) {
        response.status(400);
        throw new Error('Необходимо ввести данные в поле "Текст"');
    }

    const goal = Goal(request.body);

    databaseController.createItem("goals", goal)
        .then(() => response.status(201).json(goal))

}

const updateGoal = (request, response, next) => {
    const goalId = request.params.id;
    const newData = request.body;

    databaseController.getItem("goals", {"_id": ObjectId(goalId)})
        .then(goal => {
            if(!goal) {
                response.status(404);
                throw new Error("Goal not found");
            }

            return databaseController.changeItem("goals", {"_id": ObjectId(goalId)}, newData)
        })
        .then(result => response.status(200).json(result))
        .catch(error => next(error));
}

const deleteGoal = (request, response, next) => {
    const goalId = request.params.id;

    databaseController.getItem("goals", {"_id": ObjectId(goalId)})
        .then(goal => {
            if(!goal) {
                response.status(404);
                throw new Error("Goal not found");
            }

            return databaseController.deleteItem("goals", {"_id": ObjectId(goalId)})
        })
        .then(result => response.status(200).json(result))
        .catch(error => next(error));
}

module.exports = {getAllGoals, getGoalById, createGoal, updateGoal, deleteGoal};