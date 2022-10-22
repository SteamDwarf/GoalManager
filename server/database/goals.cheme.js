const Goal = ({text, isDone = false}) => {
    return {
        text,
        isDone,
        createdAt: Date.now()
    }
}

module.exports = Goal;