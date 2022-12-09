'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      projectName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      projectType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING
      },
      materials: {
        type: Sequelize.ARRAY(Sequelize.JSON)
      },
      images: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      budget: {
        type: Sequelize.STRING
      },
      startDate: {
        type: Sequelize.DATE
      },
      endDate: {
        type: Sequelize.DATE
      },
      isPublic: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('projects')
  }
}
