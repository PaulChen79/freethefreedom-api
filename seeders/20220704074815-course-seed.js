'use strict'
const courses = require('../seeds-file/courses.json')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Courses', courses.map(course => {
      return {
        name: course.name,
        image: course.image,
        system_id: course.systemId,
        desc: course.desc,
        qualification: course.qualification,
        content: course.content,
        exam: course.exam,
        will_learn: course.willLearn,
        price: course.price,
        price_desc: course.priceDesc,
        created_at: new Date(),
        updated_at: new Date()
      }
    }), {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Courses', null, {})
  }
}
