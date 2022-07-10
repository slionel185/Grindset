const asyncHandler = require('express-async-handler')

const Foods = require('../models/foods.model')
const Users = require('../models/users.model')

const getFoods = asyncHandler(async (req, res) => {
    const foods = await Foods.find({ userId: req.user.id })

    res.status(200).json(foods)
})

const createFood = asyncHandler(async (req, res) => {
    if(!req.body.name || !req.body.nInfo.calories || !req.body.nInfo.fat.total || req.body.nInfo.carbohydrates.total || req.body.nInfo.protein) {
        res.status(400)
        throw new Error('Please fill out all fields.')
    }

    let data = {
        ...req.body,
        userId: req.user.id
    }

    const food = await Foods.create(data)

    res.status(201).json(food)
})

const updateFood = asyncHandler(async (req, res) => {
    const food = await Foods.findById(req.params.id)

    if(!food) {
        res.status(400)
        throw new Error('Food not found.')
    }

    const user = await Users.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found.')
    }

    if(food.userId.toString() !== user.id) {
        res.status(401)
        throw new Error('Not authorized.')
    }

    const updatedFood = await Foods.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    res.status(200).json(updatedFood)
})

const deleteFood = asyncHandler(async (req, res) => {
    const food = await Foods.findById(req.params.id)

    if(!food) {
        res.status(400)
        throw new Error('Food not found.')
    }

    const user = await Users.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found.')
    }

    if(food.userId.toString() !== user.id) {
        res.status(401)
        throw new Error('Not authorized.')
    }

    await food.remove()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getFoods,
    createFood,
    updateFood,
    deleteFood
}