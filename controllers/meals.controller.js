const asyncHandler = require('express-async-handler')

const Meals = require('../models/meals.model')
const Users = require('../models/users.model')

const getMeals = asyncHandler(async (req, res) => {
    const meals = await Meals.find({ userId: req.user.id })

    res.status(200).json(meals)
})

const createMeal = asyncHandler(async (req, res) => {
    if(!req.body.name || !req.body.nInfo.calories || !req.body.nInfo.fat.total || !req.body.nInfo.carbohydrates.total || !req.body.nInfo.protein) {
        res.status(400)
        throw new Error('Please fill out all fields.')
    }

    let data = {
        ...req.body,
        userId: req.user.id
    }

    const meal = await Meals.create(data)

    res.status(201).json(meal)
})

const updateMeal = asyncHandler(async (req, res) => {
    const meal = await Meals.findById(req.params.id)

    if(!meal) {
        res.status(400)
        throw new error('Meal not found.')
    }

    const user = await Users.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found.')
    }

    if(meal.userId.toString() !== user.id) {
        res.status(401)
        throw new Error('Not authorized.')
    }

    const updatedMeal = await Meals.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    res.status(200).json(updatedMeal)
})

const deleteMeal = asyncHandler(async (req, res) => {
    const meal = await Meals.findById(req.params.id)

    if(!meal) {
        res.status(400)
        throw new Error('Meals not found.')
    }

    const user = await Users.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found.')
    }

    if(meal.userId.toString() !== user.id) {
        res.status(401)
        throw new Error('Not authorized.')
    }

    await meal.remove()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getMeals,
    createMeal,
    updateMeal,
    deleteMeal
}