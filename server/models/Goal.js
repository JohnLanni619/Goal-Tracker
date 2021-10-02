const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const goalSchema = new Schema(
    {
        goalTitle: {
            type: String,
            required: 'Goal must have a title',
            minlength: 5,
            maxlength: 100
        },
        targetDate: {
            type: Date
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        username: {
            type: String,
            required: true
        },
        habits: [habitSchema]
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const Goal = model('Goal', goalSchema)

module.exports = Goal;