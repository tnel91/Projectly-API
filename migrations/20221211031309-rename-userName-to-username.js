'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('users', 'userName', 'username')
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('users', 'username', 'userName')
  }
}
