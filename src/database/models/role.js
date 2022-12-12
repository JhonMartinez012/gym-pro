"use strict";
const { Model } = require("sequelize");

// const { connection } = require("../database/config");
// const User = require("./user");
// const sequelize = connection;

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //   // define association here

      //   Role.hasMany(models.User, {
      //     name: "user",
      //     foreignKey: "roleId",
      //   });

      Role.hasMany(models.User,{
        foreignKey: "roleId",
      })
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
  return Role;
};

// module.exports = Role;
