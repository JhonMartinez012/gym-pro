"use strict";
const { Model } = require("sequelize");
const { connection } = require("../database/config");
const sequelize = connection;

module.exports = (sequelize, DataTypes) => {
  class Campus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // associations with user
      Campus.belongsTo(models.User, {
        foreignKey: "userId",
      });

      Campus.belongsTo(models.principalCampus, {
        foreignKey: "id",
        target_key: "gymId",
      });

    }
  }
  Campus.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Campus",
    }
  );
  return Campus;
};
