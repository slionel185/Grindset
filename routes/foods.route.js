const { Router } = require('express')
const router = Router()

const protect = require('../middleware/auth.middleware')
const { getFoods, createFood, updateFood, deleteFood } = require('../controllers/foods.controller')

router.get('/', protect, getFoods)
router.post('/', protect, createFood)
router.put('/:id', protect, updateFood)
router.delete('/:id', protect, deleteFood)

module.exports = router