"use strict";
const { Model } = require("sequelize");

// const { connection } = require("../database/config");
// const sequelize = connection;
// const Role = require("./role");
// const sequelize = connection;

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Role, {
        foreignKey: "id",
        target_key: "roleId",


      });

      // User.hasMany(models.Campus, {
      //   foreignKey: "id",
      //   targetKey: "userId",
      // });
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

  return User;
};

// User.Role = User.belongsTo(Role);

// module.exports = User;
