'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('projects', 'description', {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: ''
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('projects', 'description', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    })
  }
}
