'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('users', 'userSettings', {
      type: Sequelize.JSONB,
      allowNull: false,
      defaultValue: { darkMode: false }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('users', 'userSettings', {
      type: Sequelize.JSONB
    })
  }
}
