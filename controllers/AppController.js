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
          attributes: ['userName', 'id']
        }
      ]
    })
    res.send(project)
  } catch (error) {
    res.status(500).send({ status: 'Error', msg: error.message })
  }
}

module.exports = {
  getAllUsers,
  getPublicProjects,
  getProjectById
}
