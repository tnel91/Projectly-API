'use strict'
const falso = require('@ngneat/falso')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [...Array(10)].map((_) => {
      return {
        userName: falso.randUserName(),
        email: falso.randEmail(),
        passwordDigest: falso.randPassword(),
        userSettings: '{"darkMode":false}'
      }
    })
    await queryInterface.bulkInsert('users', users, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  }
}
