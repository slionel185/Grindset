const { Router } = require('express')
const router = Router()

const protect = require('../middleware/auth.middleware')

const { getWorkouts, createWorkout, updateWorkout, deleteWorkout } = require('../controllers/workouts.controller')

router.get('/', protect, getWorkouts)

router.post('/', protect, createWorkout)

router.put('/:id', protect, updateWorkout)

router.delete('/:id', protect, deleteWorkout)

module.exports = router