'use strict'
const systems = require('../seeds-file/system.json')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Systems', systems.map(system => {
      return {
        name: system.name,
        created_at: new Date(),
        updated_at: new Date()
      }
    }), {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Systems', null, {})
  }
}
