const { Schema, model } = require('mongoose')

const usersModel = new Schema({
    name: {
        type: String,
        required: [true, 'Please add a name.']
    },
    email: {
        type: String,
        requried: [true, 'Please add an email.']
    },
    password: {
        type: String,
        required: [true, 'Please add a password.']
    }
}, {
    timestamps: true
})

module.exports = model('Users', usersModel)