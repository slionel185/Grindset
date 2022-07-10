// Require and init express Router
const { Router } = require('express')
const router = Router()

router.use('/', require('./users.route'))
router.use('/foods', require('./foods.route'))
router.use('/meals', require('./meals.route'))
router.use('/workouts', require('./workouts.route'))
router.use('/excersizes', require('./excersizes.route'))

module.exports = router