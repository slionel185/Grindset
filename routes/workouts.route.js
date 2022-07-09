const { Router } = require('express')
const router = Router()

const protect = require('../middleware/auth.middleware')

const { getWorkouts, createWorkout } = require('../controllers/workouts.controller')

router.get('/', protect, getWorkouts)

router.post('/', protect, createWorkout)

router.put('/:id', protect)

router.delete('/:id', protect)

module.exports = router