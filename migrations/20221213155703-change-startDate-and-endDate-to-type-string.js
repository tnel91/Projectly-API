'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('projects', 'startDate', {
      type: Sequelize.STRING
    })
    await queryInterface.changeColumn('projects', 'endDate', {
      type: Sequelize.STRING
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('projects', 'startDate', {
      type: Sequelize.DATE
    })
    await queryInterface.changeColumn('projects', 'endDate', {
      type: Sequelize.DATE
    })
  }
}
