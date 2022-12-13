'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('projects', 'projectType', 'tags')
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('projects', 'tags', 'projectType')
  }
}
