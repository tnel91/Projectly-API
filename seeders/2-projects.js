'use strict'
const falso = require('@ngneat/falso')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const projects = [...Array(50)].map((_) => {
      return {
        user_id: falso.randNumber({
          min: 1,
          max: 10
        }),
        project_name: falso.randProductName(),
        description: falso.randProductDescription(),
        image: 'https://picsum.photos/200',
        budget: `${falso.randCurrencySymbol()} ${falso.randNumber({
          min: 50,
          max: 2000
        })}]`,
        start_date: falso.randRecentDate({ days: 30 }),
        end_date: falso.randSoonDate({ days: 30 }),
        is_public: falso.randBoolean()
      }
    })
    await queryInterface.bulkInsert('projects', projects, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('projects', null, {})
  }
}
