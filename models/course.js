'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Course.belongsTo(models.System, { foreignKey: 'systemId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
      Course.hasMany(models.Schedule, { foreignKey: 'courseId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    }
  }
  Course.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    systemId: DataTypes.INTEGER,
    desc: DataTypes.STRING,
    qualification: DataTypes.ARRAY(DataTypes.STRING),
    content: DataTypes.ARRAY(DataTypes.STRING),
    exam: DataTypes.ARRAY(DataTypes.STRING),
    willLearn: DataTypes.ARRAY(DataTypes.STRING),
    price: DataTypes.INTEGER,
    priceDesc: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Course',
    tableName: 'Courses',
    underscored: true
  })
  return Course
}
