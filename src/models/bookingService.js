"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BookingService extends Model {
    static associate(models) {
      BookingService.belongsTo(models.Booking, { foreignKey: "booking_id" });
      BookingService.belongsTo(models.Service, { foreignKey: "service_id" });
    }
  }

  BookingService.init(
    {
      booking_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "bookings", // sửa chỗ này
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      service_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "services", // sửa chỗ này
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "BookingService",
      tableName: "booking_services",
      timestamps: true,
    }
  );

  return BookingService;
};
