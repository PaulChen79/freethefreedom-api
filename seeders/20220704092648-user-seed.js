'use strict'
const bcrypt = require('bcryptjs')
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'root',
        email: 'root@example.com',
        password: await bcrypt.hash('12345678', 10),
        is_admin: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        username: 'user1',
        email: 'user1@example.com',
        password: await bcrypt.hash('12345678', 10),
        is_admin: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        username: 'user2',
        email: 'user2@example.com',
        password: await bcrypt.hash('12345678', 10),
        is_admin: false,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
}
