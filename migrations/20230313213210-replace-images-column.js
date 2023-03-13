'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('projects', 'images'),
      await queryInterface.addColumn('projects', 'image', {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
      })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('projects', 'image'),
      await queryInterface.addColumn('projects', 'images', {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
        defaultValue: null
      })
  }
}
