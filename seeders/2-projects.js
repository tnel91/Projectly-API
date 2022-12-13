'use strict'
const falso = require('@ngneat/falso')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const projects = [...Array(50)].map((_) => {
      return {
        userId: falso.randNumber({
          min: 189,
          max: 198
        }),
        projectName: falso.randProductName(),
        tags: falso.randProductCategory(),
        description: falso.randProductDescription(),
        materials:
          '{"list":[' +
          '{"name":"Plywood","amount":"1 sheet" },' +
          '{"name":"Fabric","amount":"2 yards" },' +
          '{"name":"Worbla","amount":"1 sheet" }]}',
        images: falso.randImg({ length: 3 }),
        budget: `${falso.randCurrencySymbol()} ${falso.randNumber({
          min: 50,
          max: 2000
        })}]`,
        startDate: falso.randRecentDate({ days: 30 }),
        endDate: falso.randSoonDate({ days: 30 }),
        isPublic: falso.randBoolean()
      }
    })
    await queryInterface.bulkInsert('projects', projects, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('projects', null, {})
  }
}
