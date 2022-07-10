const { Router } = require('express')
const router = Router()

const protect = require('../middleware/auth.middleware')
const { getMeals, createMeal, updateMeal, deleteMeal } = require('../controllers/meals.controller')

router.get('/', protect, getMeals)
router.post('/', protect, createMeal)
router.put('/:id', protect, updateMeal)
router.delete('/:id', protect, deleteMeal)

module.exports = router