"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      Booking.belongsTo(models.User, {
        foreignKey: "customer_id",
        as: "customer",
      });
      Booking.belongsTo(models.User, {
        foreignKey: "employee_id",
        as: "employee",
      });
      Booking.hasMany(models.BookingService, {
        foreignKey: "booking_id",
        as: "bookingServices",
      });
    }
  }
  Booking.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      customer_id: { type: DataTypes.INTEGER, allowNull: false },
      employee_id: { type: DataTypes.INTEGER, allowNull: true },
      appointment_date: { type: DataTypes.DATEONLY, allowNull: false },
      appointment_time: { type: DataTypes.TIME, allowNull: false },
      status: {
        type: DataTypes.ENUM(
          "pending",
          "confirmed",
          "cancelled",
          "in_progress",
          "completed",
          "success"
        ),
        defaultValue: "pending",
      },
      total_price: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.0 },
      notes: DataTypes.TEXT,
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      sequelize,
      modelName: "Booking",
      timestamps: true,
    }
  );

  return Booking;
};
