const asyncHandler = require('express-async-handler')

const Excersizes = require('../models/excersizes.model')
const Users = require('../models/users.model')

const getExcersizes = asyncHandler(async (req, res) => {
    const excersizes = await Excersizes.find({ userId: req.user.id })

    res.status(200).json(excersizes)
})

const createExcersize = asyncHandler(async (req, res) => {
    if(!req.body.name) {
        res.status(400)
        throw new Error('Please add a name field.')
    }

    const excersize = await Excersizes.create({
        userId: req.user.id,
        name: req.body.name
    })

    res.status(201).json(excersize)
})

const updateExcersize = asyncHandler(async (req, res) => {
    const excersize = await Excersizes.findById(req.params.id)

    if(!excersize) {
        res.status(400)
        throw new Error('Excersize not found.')
    }

    const user = await Users.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found.')
    }

    if(excersize.userId.toString() !== user.id) {
        res.status(401)
        throw new Error('Not authorized')
    }

    const updatedExcersize = await Excersizes.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    res.status(200).json(updatedExcersize)
})

const deleteExcersize = asyncHandler(async (req, res) => {
    const excersize = await Excersizes.findById(req.params.id)

    if(!excersize) {
        res.status(400)
        throw new Error('Excersize not found.')
    }

    const user = await Users.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found.')
    }

    if(excersize.userId.toString() !== user.id) {
        res.status(401)
        throw new Error('Not authorized.')
    }

    await excersize.remove()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getExcersizes,
    createExcersize,
    updateExcersize,
    deleteExcersize
}