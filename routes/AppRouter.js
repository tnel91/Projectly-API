const router = require('express').Router()
const controller = require('../controllers/AppController')

router.get('/users', controller.getAllUsers)

// router.post('/users', controller.createUser)

router.get('/projects', controller.getPublicProjects)

router.get('/projects/:projectId', controller.getProjectById)

module.exports = router
