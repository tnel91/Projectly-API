'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.changeColumn('users', 'userSettings', {
      type: Sequelize.JSONB,
      allowNull: false,
      defaultValue: { darkMode: false }
    })
  },

  async down(queryInterface, Sequelize) {
    queryInterface.changeColumn('users', 'userSettings', {
      type: Sequelize.JSONB
    })
  }
}
