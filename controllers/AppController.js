const { User, Project, Checklist } = require('../models')
const fs = require('fs')
const pg = require('pg')
const middleware = require('../middleware')
const bucket = require('../routes/AppRouter')

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll()
    // console.log(users)
    res.send(users)
  } catch (error) {
    res.status(500).send({ status: 'Error', msg: error.message })
  }
}

// console.log(bucket)

const getPublicProjects = async (req, res) => {
  // console.log('hit route - getPublicProjects')
  try {
    const projects = await Project.findAll({
      where: {
        is_public: true
      },
      include: 'owner'
    })
    res.send(projects)
    // console.log(projects)
  } catch (error) {
    res.status(500).send({ status: 'Error', msg: error.message })
  }
}

const getProjectById = async (req, res) => {
  console.log('GET PROJECT BY ID XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
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
    let img
    if (project.dataValues.image.includes('uploads')) {
      // download image and save locally
      const filePath = project.dataValues.image
      try {
        img = fs.readFileSync(filePath)
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
    console.log('deleting local image file')
    // delete local image file
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
  console.log('UPDATE PROJECT XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  try {
    const updatedProject = await Project.update(
      {
        project_name: req.body.projectName,
        description: req.body.description,
        budget: req.body.budget,
        start_date: req.body.startDate,
        end_date: req.body.endDate,
        is_public: req.body.isPublic,
        updated_at: new Date()
      },
      { where: { id: req.body.id }, returning: true }
    )
    const response = updatedProject[1][0].dataValues
    res.send(response)
  } catch (error) {
    console.log('error')
    res.status(500).send({ status: 'Error', msg: error.message })
  }
}

const updateProjectImageFile = async (req, res) => {
  console.log('UPDATE IMAGE XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  let picture
  console.log(req.body.id)
  if (req.file) {
    console.log(req.file)
    picture = req.file.path
    // const blob = middleware.bucket.file(req.file.originalname)
    // const stream = blob.createWriteStream({
    //   metadata: {
    //     contentType: req.file.mimetype
    //   }
    // })
    // stream.on('error', (err) => {
    //   console.log(err)
    // })
    // stream.on('finish', () => {
    //   console.log('uploaded')
    // })
    // stream.end(req.file.buffer)
  } else {
    picture = req.body.image
  }
  try {
    const updatedProject = await Project.update(
      {
        image: picture,
        updated_at: new Date()
      },
      { where: { id: req.body.id }, returning: true }
    )
    const response = updatedProject[1][0].dataValues
    res.send(response)
  } catch (error) {
    console.log('error')
    res.status(500).send({ status: 'Error', msg: error.message })
  }
}

const updateProjectImageUrl = async (req, res) => {
  console.log(req.body)
  try {
    const updatedProject = await Project.update(
      {
        image: req.body.imageUrl,
        updated_at: new Date()
      },
      { where: { id: req.body.id }, returning: true }
    )
    const response = updatedProject[1][0].dataValues
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
  updateProjectImageFile,
  updateProjectImageUrl,
  deleteProject,
  getChecklists,
  createChecklist,
  updateChecklist,
  deleteChecklist
}
