const { geoSearch } = require('../models/Goal');
//const Goal = require('../models/Goal');
const databaseController = require('../database/dbController');
const Goal = require('../database/goals.scheme');

const getAllGoals = (request, response) => {
    const goals = []

    databaseController.getItems("goals", {}).stream()
        .on("data", data => {
            goals.push(data)
        })
        .on("end", () => response.status(200).json(goals));
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
    const goal = await Goal.findById(goalId);

    if(!goal) {
        response.status(404);
        throw new Error('Goal с таким id не найден');
    }

    //TODO проблема с обработкой ошибки. Проблема в async

    if(!request.body.text) {
        response.status(400);
        throw new Error('Необходимо ввести данные в поле "Текст"');
    }

    Goal.findByIdAndUpdate(goalId, request.body, {new: true})
        .then(updatedGoal => response.status(200).json(updatedGoal))
        .catch(error => {
            response.status(400);
            console.log(error);
            throw new Error(error.message);
        })

}

module.exports = {getAllGoals, createGoal, updateGoal};