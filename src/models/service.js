"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    static associate(models) {
      // Nếu Service có liên kết với model khác, khai báo ở đây
    }
  }

  Service.init(
    {
      service_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      estimated_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Service",
      timestamps: true, // Tự động thêm createdAt và updatedAt
    }
  );

  return Service;
};
