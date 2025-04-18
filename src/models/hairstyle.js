"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Hairstyle extends Model {
    static associate(models) {
      // Nếu có quan hệ với bảng nào khác thì thêm ở đây
    }
  }

  Hairstyle.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Hairstyle",
      tableName: "Hairstyles",
      timestamps: true,
    }
  );

  return Hairstyle;
};
