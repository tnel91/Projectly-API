'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('users', 'userName', 'username')
    await queryInterface.renameColumn('users', 'passwordDigest', 'password')
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('users', 'username', 'userName')
    await queryInterface.renameColumn('users', 'password', 'passwordDigest')
  }
}
