const router = require('express').Router()
const controller = require('../controllers/AppController')

router.get('/users', controller.getAllUsers)

router.get('/projects', controller.getPublicProjects)

module.exports = router
