// Require and init express Router
const { Router } = require('express')
const router = Router()

const protect = require('../middleware/auth.middleware')

const { getCurrentUser, login, register } = require('../controllers/users.controller')

router.get('/', protect, getCurrentUser)

router.post('/login', login)
router.post('/register', register)

module.exports = router