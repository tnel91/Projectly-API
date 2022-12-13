'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('checklists', 'listItems', {
      type: Sequelize.JSONB,
      allowNull: false,
      defaultValue: { items: [] }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('checklists', 'listItems', {
      type: Sequelize.JSONB
    })
  }
}
