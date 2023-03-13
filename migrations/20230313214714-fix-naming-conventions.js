'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('projects', 'userId', 'user_id')
    await queryInterface.renameColumn('projects', 'projectName', 'project_name')
    await queryInterface.renameColumn('projects', 'startDate', 'start_date')
    await queryInterface.renameColumn('projects', 'endDate', 'end_date')
    await queryInterface.renameColumn('projects', 'isPublic', 'is_public')
    await queryInterface.renameColumn('projects', 'createdAt', 'created_at')
    await queryInterface.renameColumn('projects', 'updatedAt', 'updated_at')
    await queryInterface.renameColumn('user_projects', 'userId', 'user_id')
    await queryInterface.renameColumn(
      'user_projects',
      'projectId',
      'project_id'
    )
    await queryInterface.renameColumn(
      'user_projects',
      'createdAt',
      'created_at'
    )
    await queryInterface.renameColumn(
      'user_projects',
      'updatedAt',
      'updated_at'
    )
    await queryInterface.renameColumn('users', 'userSettings', 'user_settings')
    await queryInterface.renameColumn('users', 'createdAt', 'created_at')
    await queryInterface.renameColumn('users', 'updatedAt', 'updated_at')
    await queryInterface.renameColumn('checklists', 'projectId', 'project_id')
    await queryInterface.renameColumn('checklists', 'listItems', 'list_items')
    await queryInterface.renameColumn('checklists', 'createdAt', 'created_at')
    await queryInterface.renameColumn('checklists', 'updatedAt', 'updated_at')
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('projects', 'user_id', 'userId')
    await queryInterface.renameColumn('projects', 'project_name', 'projectName')
    await queryInterface.renameColumn('projects', 'start_date', 'startDate')
    await queryInterface.renameColumn('projects', 'end_date', 'endDate')
    await queryInterface.renameColumn('projects', 'is_public', 'isPublic')
    await queryInterface.renameColumn('projects', 'created_at', 'createdAt')
    await queryInterface.renameColumn('projects', 'updated_at', 'updatedAt')
    await queryInterface.renameColumn('user_projects', 'user_id', 'userId')
    await queryInterface.renameColumn(
      'user_projects',
      'project_id',
      'projectId'
    )
    await queryInterface.renameColumn(
      'user_projects',
      'created_at',
      'createdAt'
    )
    await queryInterface.renameColumn(
      'user_projects',
      'updated_at',
      'updatedAt'
    )
    await queryInterface.renameColumn('users', 'user_settings', 'userSettings')
    await queryInterface.renameColumn('users', 'created_at', 'createdAt')
    await queryInterface.renameColumn('users', 'updated_at', 'updatedAt')
    await queryInterface.renameColumn('checklists', 'project_id', 'projectId')
    await queryInterface.renameColumn('checklists', 'list_items', 'listItems')
    await queryInterface.renameColumn('checklists', 'created_at', 'createdAt')
    await queryInterface.renameColumn('checklists', 'updated_at', 'updatedAt')
  }
}
