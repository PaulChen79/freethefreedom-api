'use strict'
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      system_id: {
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.STRING
      },
      desc: {
        type: Sequelize.STRING
      },
      qualification: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      content: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      exam: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      price: {
        type: Sequelize.INTEGER
      },
      price_desc: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Courses')
  }
}
