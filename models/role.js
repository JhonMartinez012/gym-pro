"use strict";
const { Model, DataTypes } = require("sequelize");

const { connection } = require("../database/config");
const User = require("./user");
const sequelize = connection;

class Role extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here

  }
}
Role.init(
  {
    name: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "Role",
  }
);

module.exports = Role;
