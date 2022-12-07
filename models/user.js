"use strict";
const { Model, Sequelize, DataTypes } = require("sequelize");

const { connection } = require("../database/config");
const Role = require("./role");
const sequelize = connection;

class User extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // association whit role
    User.belongsTo(Role, {
      foreignKey: "roleId",
    });

    // association whit campus
    User.belongsTo(models.campus, {
      foreignKey: "campusId",
      onDelete: "CASCADE",
    });
    
  }
}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    password: DataTypes.STRING,
    roleId: DataTypes.INTEGER,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "User",
    password: false,
  }
);

module.exports = User;
