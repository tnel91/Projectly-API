'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('projects', 'image', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('projects', 'image')
    await queryInterface.addColumn('projects', 'image', {
      type: Sequelize.BLOB,
      allowNull: false,
      defaultValue: ''
    })
  }
}
