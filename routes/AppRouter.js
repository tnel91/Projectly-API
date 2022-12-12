const router = require('express').Router()
const controller = require('../controllers/AppController')
const authController = require('../controllers/AuthController')
const middleware = require('../middleware')

router.get('/users', controller.getAllUsers)

router.get('/projects', controller.getPublicProjects)

router.get('/projects/:projectId', controller.getProjectById)

router.post(
  '/projects',
  middleware.stripToken,
  middleware.verifyToken,
  controller.createNewProject
)

// Auth Routes

router.post('/register', authController.Register)

router.post('/login', authController.Login)

router.get(
  '/session',
  middleware.stripToken,
  middleware.verifyToken,
  authController.CheckSession
)

module.exports = router
