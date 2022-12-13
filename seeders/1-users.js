'use strict'
const falso = require('@ngneat/falso')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [...Array(10)].map((_) => {
      return {
        username: falso.randUserName(),
        email: falso.randEmail(),
        password: falso.randPassword()
      }
    })
    await queryInterface.bulkInsert('users', users, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  }
}
