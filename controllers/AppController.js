const { User, Project, Checklist } = require('../models')

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll()
    console.log(users)
    res.send(users)
  } catch (error) {
    res.status(500).send({ status: 'Error', msg: error.message })
  }
}

const getPublicProjects = async (req, res) => {
  console.log('hit route - getPublicProjects')
  try {
    const projects = await Project.findAll({
      where: {
        is_public: true
      },
      include: 'owner'
    })
    res.send(projects)
    console.log(projects)
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
      where: { user_id: req.params.userId },
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
  console.log(req.body)
  try {
    const updatedProject = await Project.update(
      {
        project_name: req.body.projectName,
        description: req.body.description,
        image: req.body.image,
        budget: req.body.budget,
        start_date: req.body.startDate,
        end_date: req.body.endDate,
        is_public: req.body.isPublic,
        updated_at: new Date()
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
        project_id: req.params.projectId
      }
    })
    res.send(checklists)
  } catch (error) {
    res.status(500).send({ status: 'Error', msg: error.message })
  }
}

const createChecklist = async (req, res) => {
  try {
    const newChecklist = await Checklist.create({
      project_id: req.params.projectId
    })
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
        updated_at: new Date()
      },
      {
        where: {
          id: req.params.checklistId
        }
      }
    )
    res.send({
      msg: `Checklist with an id of ${req.params.checklistId} has been updated!`
    })
  } catch (error) {
    res.status(500).send({ status: 'Error', msg: error.message })
  }
}

const deleteChecklist = async (req, res) => {
  try {
    await Checklist.destroy({
      where: {
        id: req.params.checklistId
      }
    })
    res.send({
      msg: `Checklist with an id of ${req.params.checklistId} has been deleted!`
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
  updateChecklist,
  deleteChecklist
}
