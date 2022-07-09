const { Schema, model } = require('mongoose')

const workoutsModel = new Schema({
    userId: { 
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    name: {
        type: String,
        required: [true, 'Please add a name.']
    },
    duration: {
        type: String
    },
    excersizes: [{
        excersizeId: { 
            type: Schema.Types.ObjectId,
            ref: 'Excersizes',
            required: true
        },
        sets: [{
            weight: Number,
            reps: Number
        }]
    }]
}, {
    timestamps: true
})

module.exports = model('Workouts', workoutsModel)