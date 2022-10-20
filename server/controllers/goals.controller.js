const { geoSearch } = require('../models/Goal');
//const Goal = require('../models/Goal');
const databaseController = require('../database/dbController');
const Goal = require('../database/goals.scheme');
const { ObjectId } = require('mongodb');

const getAllGoals = (request, response) => {
    const goals = []

    databaseController.getItems("goals", {}).toArray()
        .then(goals => response.status(200).json(goals))
    /*cursor.stream()
        .on("data", data => {
            goals.push(data)
        })
        .on("end", () => response.status(200).json(goals)); */
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

const updateGoal = async(request, response) => {
    const goalId = request.params.id;
    const newData = request.body;
    
    databaseController.changeItem("goals", {"_id": ObjectId(goalId)}, newData)
        .then(result => response.status(200).json(result))
}

module.exports = {getAllGoals, getGoalById, createGoal, updateGoal};