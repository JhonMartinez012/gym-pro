'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class principalCampus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      principalCampus.hasMany(models.Campus, {
        foreignKey: 'gymId',
      });
    }
  }
  principalCampus.init({
    nit: DataTypes.STRING,
    name: DataTypes.STRING,
    principalPhone: DataTypes.STRING,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'principalCampus',
  });
  return principalCampus;
};