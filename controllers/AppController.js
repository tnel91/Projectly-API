const { User, Project, Checklist } = require('../models')

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll()
    res.send(users)
  } catch (error) {
    res.status(500).send({ status: 'Error', msg: error.message })
  }
}

const getPublicProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      where: {
        isPublic: true
      },
      include: 'owner'
    })
    res.send(projects)
  } catch (error) {
    res.status(500).send({ status: 'Error', msg: error.message })
  }
}

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findOne({
      where: { id: `${req.params.projectId}` },
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['username', 'id']
        }
      ]
    })
    res.send(project)
  } catch (error) {
    res.status(500).send({ status: 'Error', msg: error.message })
  }
}

const getUserProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      where: { userId: req.params.userId },
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['username', 'id']
        }
      ]
    })
    res.send(projects)
  } catch (error) {
    res.status(500).send({ status: 'Error', msg: error.message })
  }
}

const createNewProject = async (req, res) => {
  try {
    const newProject = await Project.create({ ...req.body })
    res.send(newProject)
  } catch (error) {
    res.status(500).send({ status: 'Error', msg: error.message })
  }
}

const updateProject = async (req, res) => {
  try {
    // res.send(req.body)
    const updatedProject = await Project.update(
      {
        projectName: req.body.projectName,
        tags: req.body.tags,
        description: req.body.description,
        materials: req.body.materials,
        images: req.body.images,
        budget: req.body.budget,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        isPublic: req.body.isPublic,
        updatedAt: new Date()
      },
      { where: { id: req.body.id }, returning: true }
    )
    res.send(updatedProject)
  } catch (error) {
    res.status(500).send({ status: 'Error', msg: error.message })
  }
}

const deleteProject = async (req, res) => {
  try {
    await Project.destroy({
      where: {
        id: req.params.projectId
      }
    })
    res.send({
      msg: `Project with an id of ${req.params.projectId} has been deleted!`
    })
  } catch (error) {
    res.status(500).send({ status: 'Error', msg: error.message })
  }
}

const getChecklists = async (req, res) => {
  try {
    const checklists = await Checklist.findAll({
      where: {
        projectId: req.params.projectId
      }
    })
    res.send(checklists)
  } catch (error) {
    res.status(500).send({ status: 'Error', msg: error.message })
  }
}

const createChecklist = async (req, res) => {
  try {
    const newChecklist = await Checklist.create({ ...req.body })
    res.send(newChecklist)
  } catch (error) {
    res.status(500).send({ status: 'Error', msg: error.message })
  }
}

const updateChecklist = async (req, res) => {
  try {
    await Checklist.update(
      {
        ...req.body,
        updatedAt: new Date()
      },
      {
        where: {
          id: req.params.checkListId
        }
      }
    )
    res.send({
      msg: `Checklist with an id of ${req.params.checkListId} has been updated!`
    })
  } catch (error) {
    res.status(500).send({ status: 'Error', msg: error.message })
  }
}

module.exports = {
  getAllUsers,
  getPublicProjects,
  getProjectById,
  createNewProject,
  getUserProjects,
  updateProject,
  deleteProject,
  getChecklists,
  createChecklist,
  updateChecklist
}
