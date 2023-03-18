const router = require('express').Router()
const controller = require('../controllers/AppController')
const authController = require('../controllers/AuthController')
const middleware = require('../middleware')

router.get('/users', controller.getAllUsers)

// Project Routes

router.get('/projects', controller.getPublicProjects)

router.get(
  '/projects/user/:userId',
  middleware.stripToken,
  middleware.verifyToken,
  controller.getUserProjects
)

router.get('/projects/:projectId', controller.getProjectById)

router.post(
  '/projects',
  middleware.stripToken,
  middleware.verifyToken,
  controller.createNewProject
)

router.put(
  '/projects/:projectId',
  middleware.stripToken,
  middleware.verifyToken,
  // middleware.oldHandler.single('image'),
  controller.updateProject
)

router.put(
  '/projects/:projectId/image-file',
  middleware.stripToken,
  middleware.verifyToken,
  middleware.oldHandler.single('imageFile'),
  controller.updateProjectImageFile
)

router.put(
  '/projects/:projectId/image-url',
  middleware.stripToken,
  middleware.verifyToken,
  controller.updateProjectImageUrl
)

router.delete(
  '/projects/:projectId',
  middleware.stripToken,
  middleware.verifyToken,
  controller.deleteProject
)

router.get('/checklists/:projectId', controller.getChecklists)

router.post(
  '/checklists/:projectId',
  middleware.stripToken,
  middleware.verifyToken,
  controller.createChecklist
)

router.put(
  '/checklists/:checklistId',
  middleware.stripToken,
  middleware.verifyToken,
  controller.updateChecklist
)

router.delete(
  '/checklists/:checklistId',
  middleware.stripToken,
  middleware.verifyToken,
  controller.deleteChecklist
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
