'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Schedule.belongsTo(models.Course, { foreignKey: 'courseId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
      Schedule.belongsToMany(models.User, {
        through: models.ReservedSchedule,
        foreignKey: 'scheduleId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'UserReservedSchedules'
      })
    }
  }
  Schedule.init({
    name: DataTypes.STRING,
    courseId: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    customDate: DataTypes.BOOLEAN,
    maxPeople: DataTypes.INTEGER,
    desc: DataTypes.STRING,
    isAvailable: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Schedule',
    tableName: 'Schedules',
    underscored: true
  })
  return Schedule
}
