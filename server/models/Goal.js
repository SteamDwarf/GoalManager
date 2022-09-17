const mongoose = require('mongoose');

const goalScheme = mongoose.Schema(
    {
        text: {
            type: String,
            required: [true, 'Пожалуйста введите текст']
        },
        isDone: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Goal', goalScheme);