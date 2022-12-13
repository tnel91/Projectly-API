'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('projects', 'projectName', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'New Project'
    })
    await queryInterface.changeColumn('projects', 'tags', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    })
    await queryInterface.changeColumn('projects', 'description', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    })
    await queryInterface.changeColumn('projects', 'materials', {
      type: Sequelize.JSONB,
      allowNull: false,
      defaultValue: { list: [] }
    })
    await queryInterface.changeColumn('projects', 'images', {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
      defaultValue: []
    })
    await queryInterface.changeColumn('projects', 'budget', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    })
    await queryInterface.changeColumn('projects', 'startDate', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    })
    await queryInterface.changeColumn('projects', 'endDate', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    })
    await queryInterface.changeColumn('projects', 'isPublic', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('projects', 'projectName', {
      type: Sequelize.STRING,
      allowNull: false
    })
    await queryInterface.changeColumn('projects', 'tags', {
      type: Sequelize.STRING,
      allowNull: false
    })
    await queryInterface.changeColumn('projects', 'description', {
      type: Sequelize.STRING
    })
    await queryInterface.changeColumn('projects', 'materials', {
      type: Sequelize.JSONB
    })
    await queryInterface.changeColumn('projects', 'images', {
      type: Sequelize.ARRAY(Sequelize.STRING)
    })
    await queryInterface.changeColumn('projects', 'budget', {
      type: Sequelize.STRING
    })
    await queryInterface.changeColumn('projects', 'startDate', {
      type: Sequelize.STRING
    })
    await queryInterface.changeColumn('projects', 'endDate', {
      type: Sequelize.STRING
    })
    await queryInterface.changeColumn('projects', 'isPublic', {
      type: Sequelize.BOOLEAN,
      allowNull: false
    })
  }
}
