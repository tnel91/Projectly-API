'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('projects', 'images', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('projects', 'images', {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
      defaultValue: []
    })
  }
}
