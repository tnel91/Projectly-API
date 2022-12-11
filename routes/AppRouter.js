const router = require('express').Router()
const controller = require('../controllers/AppController')
const authController = require('../controllers/AuthController')
const middleware = require('../middleware')

router.get('/users', controller.getAllUsers)

router.get('/projects', controller.getPublicProjects)

router.get('/projects/:projectId', controller.getProjectById)

router.post('/projects', controller.createNewProject)

// Auth Routes

router.post('/register', authController.Register)

router.post('/login', authController.Login)

module.exports = router
