const { Schema, model } = require('mongoose')

const mealsModel = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    foods: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }],
    nInfo: {
        calories: {
            type: Number,
            required: [true, 'Please add the calories.']
        },
        fat: {
            total: {
                type: Number,
                required: [true, 'Please add the total fat.']
            },
            saturated: Number,
            trans: Number
        },
        cholesterol: Number,
        sodium: Number,
        carbohydrates: {
            total: {
                type: Number,
                required: [true, 'Please add the total carbohydrates.']
            },
            fiber: Number,
            sugar: {
                total: Number,
                added: Number
            }
        },
        protein: {
            type: Number,
            required: [true, 'Please add the protein.']
        }
    }
}, {
    timestamps: true
})

module.exports = model('Meals', mealsModel)