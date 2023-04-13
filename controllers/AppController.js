const { User, Project, Checklist } = require('../models')
const fs = require('fs')

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
      attributes: ['id', 'project_name'],
      where: {
        is_public: true
      },
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['username']
        }
      ]
    })
    res.send(projects)
  } catch (error) {
    res.status(500).send({ status: 'Error', msg: error.message })
  }
}

const getUserProjects = async (req, res) => {
  const { id } = res.locals.payload
  try {
    const projects = await Project.findAll({
      attributes: ['id', 'project_name'],
      where: { user_id: id },
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['username']
        }
      ]
    })
    res.send(projects)
  } catch (error) {
    res.status(500).send({ status: 'Error', msg: error.message })
  }
}

const createNewProject = async (req, res) => {
  const { id } = res.locals.payload
  try {
    const newProject = await Project.create({ user_id: id })
    console.log(newProject)
    res.send(newProject)
  } catch (error) {
    res.status(500).send({ status: 'Error', msg: error.message })
  }
}

const getProjectById = async (req, res) => {
  const { id } = res.locals.payload
  try {
    const project = await Project.findOne({
      where: { id: `${req.params.projectId}` },
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['username']
        }
      ]
    })
    if (project.user_id === id) {
      project.dataValues.canEdit = true
      res.status(200).send(project.dataValues)
    } else if (project.is_public === true) {
      res.status(200).send(project)
    } else {
      res.status(403).send({ status: 'Error', msg: 'Forbidden' })
    }
  } catch (error) {
    res.status(500).send({ status: 'Error', msg: error.message })
  }
}

const updateProject = async (req, res) => {
  const { id } = res.locals.payload
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
      { where: { id: req.body.id, user_id: id }, returning: true }
    )
    const response = updatedProject[1][0].dataValues
    res.send(response)
  } catch (error) {
    console.log('error')
    res.status(500).send({ status: 'Error', msg: error.message })
  }
}

const updateProjectImageFile = async (req, res) => {
  const { id } = res.locals.payload
  let filePath = req.file.path
  let fileData = fs.readFileSync(filePath)
  try {
    const updatedProject = await Project.update(
      {
        image: req.file.path,
        image_file: fileData,
        updated_at: new Date()
      },
      { where: { id: req.body.id, user_id: id }, returning: true }
    )
    const response = updatedProject[1][0].dataValues
    fs.unlinkSync(filePath)
    res.status(200).send({ status: 'Success', msg: 'Image uploaded' })
  } catch (error) {
    console.log('error')
    res.status(500).send({ status: 'Error', msg: error.message })
  }
}

const updateProjectImageUrl = async (req, res) => {
  const { id } = res.locals.payload
  try {
    const updatedProject = await Project.update(
      {
        image: req.body.imageUrl,
        image_file: null,
        updated_at: new Date()
      },
      { where: { id: req.body.id, user_id: id }, returning: true }
    )
    const response = updatedProject[1][0].dataValues
    res.send(response)
  } catch (error) {
    console.log('error')
    res.status(500).send({ status: 'Error', msg: error.message })
  }
}

const deleteProject = async (req, res) => {
  const { id } = res.locals.payload
  try {
    const isDeleted = await Project.destroy({
      where: {
        id: req.params.projectId,
        user_id: id
      }
    })
    if (isDeleted === 1) {
      res.status(200).send({
        msg: `Project with an id of ${req.params.projectId} has been deleted!`
      })
    } else {
      console.log('forbidden')
      res.status(403).send({ status: 'Error', msg: 'Forbidden' })
    }
  } catch (error) {
    res.status(500).send({ status: 'Error', msg: error.message })
  }
}

const getChecklists = async (req, res) => {
  try {
    const checklists = await Checklist.findAll({
      where: {
        project_id: req.params.projectId
      },
      order: [['order_index', 'ASC']]
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

const updateChecklistOrder = (req, res) => {
  const { id } = res.locals.payload
  const { idArr, ownerId } = req.body
  console.log(id)
  console.log(ownerId)
  if (id !== ownerId) {
    return res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } else {
    try {
      idArr.map(async (id, i) => {
        await Checklist.update(
          {
            order_index: i,
            updated_at: new Date()
          },
          {
            where: {
              id: id
            }
          }
        )
      })
      res.status(200).send({ msg: 'Checklist order updated' })
    } catch (error) {
      res.status(500).send({ status: 'Error', msg: error.message })
    }
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
  deleteChecklist,
  updateChecklistOrder
}
