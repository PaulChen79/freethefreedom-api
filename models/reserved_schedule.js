'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ReservedSchedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  ReservedSchedule.init({
    userId: DataTypes.INTEGER,
    scheduleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ReservedSchedule',
    tableName: 'ReservedSchedules',
    underscored: true
  })
  return ReservedSchedule
}
