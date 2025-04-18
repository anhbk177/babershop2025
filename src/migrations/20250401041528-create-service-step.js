"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("service_steps", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      service_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "services", // Tên bảng services
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      step_order: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      step_title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      step_description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      step_image_url: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      created_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("service_steps");
  },
};
