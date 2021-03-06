'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class System extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      System.hasMany(models.Course, { foreignKey: 'systemId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    }
  }
  System.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'System',
    tableName: 'Systems',
    underscored: true
  })
  return System
}
