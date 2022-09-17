const Goal = require('../models/Goal');

const getAllGoals = (request, response) => {
    Goal.find()
        .then(goals => response.status(200).json(goals))
        .catch(error => {
            throw new Error(error.message);
        })
}

const createGoal = (request, response) => {
    if(!request.body.text) {
        response.status(400);
        throw new Error('Необходимо ввести данные в поле "Текст"');
    }

    Goal.create(request.body)
        .then(newGoal => response.status(201).json(newGoal))
        .catch(error => {
            response.status(400);
            throw new Error(error.message);
        })
}

const updateGoal = (request, response) => {
    const goalId = request.params.id;
    const goal = Goal.findById(goalId);

    if(!goal) {
        response.status(404);
        throw new Error('Goal с таким id не найден')
    }

    if(!request.body.text) {
        response.status(400);
        throw new Error('Все поля должны быть заполнены')
    }

    Goal.findByIdAndUpdate(goalId, request.body, {new: true})
        .then(updatedGoal => response.status(200).json(updatedGoal))
        .catch(error => {
            response.status(400);
            throw new Error(error.message);
        })

}

module.exports = {getAllGoals, createGoal, updateGoal};