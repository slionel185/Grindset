const asyncHandler = require('express-async-handler')

const Workouts = require('../models/workouts.model')
const Users = require('../models/users.model')

const getWorkouts = asyncHandler(async (req, res) => {
    const workouts = await Workouts.find({ userId: req.user.id })

    res.status(200).json(workouts)
})

const createWorkout = asyncHandler(async (req, res) => {
    if(!req.body.name) {
        res.status(400)
        throw new Error('Please add a name field.')
    }

    const workout = await Workouts.create({
        userId: req.user.id,
        name: req.body.name
    })

    res.status(201).json(workout)
})

const updateWorkout = asyncHandler(async (req, res) => {
    
})

module.exports = {
    getWorkouts,
    createWorkout
}