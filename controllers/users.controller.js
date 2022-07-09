const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')

const Users = require('../models/users.model')

const getCurrentUser = asyncHandler(async (req, res) => {
    const { _id, name, email } = req.user

    res.status(200).json({
        id: _id,
        name,
        email
    })
})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await Users.findOne({ email })

    if(user && bcrypt.compare(password, user.password)) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials.')
    }
})

const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields.')
    }

    const userExists = await Users.findOne({ email })

    if(userExists) {
        res.status(400)
        throw new Error('User already exists.')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await Users.create({ name, email, password: hashedPassword })

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data.')
    }
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

module.exports = {
    getCurrentUser,
    login,
    register
}