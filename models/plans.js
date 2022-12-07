'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class plans extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  plans.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'plans',
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER
  });
  return plans;
};