'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('checklists', 'order_index', {
      type: Sequelize.INTEGER
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('checklists', 'order_index')
  }
}
