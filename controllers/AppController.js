const { User, Project, Checklist } = require('../models')
const fs = require('fs')
const pg = require('pg')

// const multer = require('multer')
// const imageUpload = multer({ dest: 'uploads/' })

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
    // console.log('SENDING FILE')
    // console.log(project.dataValues.image)
    let img
    if (project.dataValues.image.includes('uploads')) {
      const filePath = project.dataValues.image
      try {
        img = fs.readFileSync(filePath)
        // console.log(img)
      } catch (error) {
        console.log(`Error reading image file: ${error.message}`)
        img = ''
      }
    } else {
      img = project.dataValues.image
    }
    res.send({
      project: project,
      image: img
    })
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
  console.log('REQUEST.FILE XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  let picture
  if (req.file) {
    picture = req.file.path
  } else {
    picture = req.body.image
  }
  console.log(req.body)
  console.log(req.file)
  try {
    const updatedProject = await Project.update(
      {
        project_name: req.body.projectName,
        description: req.body.description,
        image: picture,
        budget: req.body.budget,
        start_date: req.body.startDate,
        end_date: req.body.endDate,
        is_public: req.body.isPublic,
        updated_at: new Date()
      },
      { where: { id: req.body.id }, returning: true }
    )
    const response = updatedProject[1][0].dataValues
    // console.log(response)
    const filePath = response.image
    // console.log(filePath)
    // console.log('sending')
    res.sendFile(filePath, { root: '.' })
    res.send(response)
  } catch (error) {
    console.log('error')
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
