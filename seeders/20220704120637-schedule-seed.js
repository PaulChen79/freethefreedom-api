'use strict'
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Schedules', [
      {
        name: 'A2 8月班',
        course_id: 2,
        start_date: new Date(),
        end_date: new Date(),
        custom_date: false,
        max_people: 4,
        desc: '東北角鳳凰灣.早上8點集合出發',
        is_available: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'A1 8月班',
        course_id: 1,
        start_date: new Date(),
        end_date: new Date(),
        custom_date: false,
        max_people: 6,
        desc: '學科課於台北.泳池課於青年公園',
        is_available: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'A3 8月班',
        course_id: 3,
        start_date: new Date(),
        end_date: new Date(),
        custom_date: true,
        max_people: 4,
        desc: '學科課:7/7晚上.泳池課:7/8-9晚上.海訓:7/17-18整天',
        is_available: false,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Schedules', null, {})
  }
}
