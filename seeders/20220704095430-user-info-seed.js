'use strict'
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('UserInfos', [
      {
        name: '最高管理員',
        phone: '0987654321',
        user_id: 1,
        ig_id: 'IG-001',
        line_id: 'LINE-001',
        emergency_contact: '管理員的媽',
        emergency_contact_phone: '0987654322',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: '使用者1',
        phone: '0987654323',
        user_id: 2,
        ig_id: 'IG-002',
        line_id: 'LINE-002',
        emergency_contact: '使用者1的媽',
        emergency_contact_phone: '0987654324',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: '使用者2',
        phone: '0987654325',
        user_id: 3,
        ig_id: 'IG-003',
        line_id: 'LINE-003',
        emergency_contact: '使用者2的媽',
        emergency_contact_phone: '0987654326',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserInfos', null, {})
  }
}
