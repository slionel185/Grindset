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
    const workout = await Workouts.findById(req.params.id)

    if(!workout) {
        res.status(400)
        throw new Error('Workout not found.')
    }

    const user = await Users.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found.')
    }

    if(workout.userId.toString() !== user.id) {
        res.status(401)
        throw new Error('Not authorized.')
    }

    const updatedWorkout = await Workouts.findByIdAndUpdate(req.params.id, req.body, { 
        new: true
    })

    res.status(200).json(updatedWorkout)
})

const deleteWorkout = asyncHandler(async (req, res) => {
    const workout = await Workouts.findById(req.params.id)

    if(!workout) {
        res.status(400)
        throw new Error('Workout not found.')
    }

    const user = await Users.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found.')
    }

    if(workout.userId.toString() !== user.id) {
        res.status(401)
        throw new Error('Not authorized.')
    }

    await workout.remove()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getWorkouts,
    createWorkout,
    updateWorkout,
    deleteWorkout
}