const { Schema, model } = require('mongoose')

const excersizesModel = new Schema({
    userId: { 
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    name: {
        type: String,
        required: [true, 'Please add a name.']
    }
}, {
    timestamps: true
})

module.exports = model('Excersize', excersizesModel)