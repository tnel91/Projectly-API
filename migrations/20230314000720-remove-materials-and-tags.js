'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('projects', 'materials')
    await queryInterface.removeColumn('projects', 'tags')
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('projects', 'materials', {
      type: Sequelize.JSONB,
      allowNull: false,
      defaultValue: { list: [] }
    })
    await queryInterface.addColumn('projects', 'tags', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    })
  }
}
