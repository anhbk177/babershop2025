"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ServiceStep extends Model {
    static associate(models) {
      ServiceStep.belongsTo(models.Service, { foreignKey: "service_id" });
    }
  }
  ServiceStep.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      service_id: { type: DataTypes.INTEGER, allowNull: false },
      step_order: { type: DataTypes.INTEGER, allowNull: false },
      step_title: { type: DataTypes.STRING, allowNull: false },
      step_description: DataTypes.TEXT,
      step_image_url: { type: DataTypes.STRING(500), defaultValue: null },
    },
    {
      sequelize,
      modelName: "ServiceStep",
      tableName: "service_steps",
      timestamps: true,
    }
  );

  return ServiceStep;
};
