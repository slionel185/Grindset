const { Router } = require('express')
const router = Router()

const protect = require('../middleware/auth.middleware')
const { getExcersizes, createExcersize, updateExcersize, deleteExcersize } = require('../controllers/excersizes.controller')

router.get('/', protect, getExcersizes)
router.post('/', protect, createExcersize)
router.put('/:id', protect, updateExcersize)
router.delete('/:id', protect, deleteExcersize)

module.exports = router