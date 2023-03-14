'use strict'
const falso = require('@ngneat/falso')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const checklists = [...Array(100)].map((_) => {
      return {
        project_id: falso.randNumber({ min: 1, max: 50 }),
        list_items:
          '{"items":[' +
          '{"text":"Do this thing.","completed":true },' +
          '{"text":"Then do this.","completed":false },' +
          '{"text":"Finally do that.","completed":true }]}'
      }
    })
    await queryInterface.bulkInsert('checklists', checklists, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('checklists', null, {})
  }
}
