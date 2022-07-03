'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class UserInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      UserInfo.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  UserInfo.init({
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    igId: DataTypes.STRING,
    lineId: DataTypes.STRING,
    emergencyContact: DataTypes.STRING,
    emergencyContactPhone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserInfo',
    tableName: 'UserInfos',
    underscored: true
  })
  return UserInfo
}
