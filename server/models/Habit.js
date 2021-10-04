const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const habitSchema = new Schema(
    {
        habitTitle: {
            type: String,
            required: 'habit must have a name!',
            maxlength: 100
        },
        frequency: {
            type:String,
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        },
        username: {
            type:String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const Habit = model('Habit', habitSchema);

module.exports = Habit;