// Require and init express Router
const { Router } = require('express')
const router = Router()

router.use('/', require('./users.route'))
router.use('/workouts', require('./workouts.route'))

module.exports = router