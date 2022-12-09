const router = require('express').Router()
const controller = require('../controllers/AppController')

router.get('/users', controller.getAllUsers)

module.exports = router
