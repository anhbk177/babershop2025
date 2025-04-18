"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      address: DataTypes.STRING,
      birth_date: DataTypes.DATEONLY,
      CCCD: {
        type: DataTypes.STRING(20),
        unique: true,
      },
      gender: {
        type: DataTypes.BOOLEAN,
      },
      role: {
        type: DataTypes.ENUM("admin", "receptionist", "barber", "customer"),
        allowNull: false,
        defaultValue: "customer",
      },
      status: {
        type: DataTypes.ENUM("active", "inactive"),
        defaultValue: "active",
      },
      // availability_status: {
      //   type: DataTypes.ENUM("available", "unavailable"),
      //   defaultValue: null,
      // },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return User;
};
