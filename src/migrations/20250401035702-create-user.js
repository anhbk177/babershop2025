"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      first_name: {
        type: Sequelize.STRING,
      },
      last_name: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      birth_date: {
        type: Sequelize.DATEONLY,
      },
      CCCD: {
        type: Sequelize.STRING(20),
        unique: true,
      },
      gender: {
        type: Sequelize.BOOLEAN,
      },
      role: {
        type: Sequelize.ENUM("admin", "receptionist", "barber", "customer"),
        defaultValue: "customer",
      },
      status: {
        type: Sequelize.ENUM("active", "inactive"),
        defaultValue: "active",
      },
      // availability_status: {
      //   type: Sequelize.ENUM("available", "unavailable"),
      //   allowNull: true,
      //   defaultValue: null,
      // },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // Thêm chỉ mục cho email và CCCD (tăng hiệu năng tìm kiếm)
    await queryInterface.addIndex("Users", ["email"], { unique: true });
    await queryInterface.addIndex("Users", ["CCCD"], { unique: true });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");

    // Xóa ENUM types thủ công nếu cần rollback sạch
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Users_role";'
    );
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Users_status";'
    );
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Users_availability_status";'
    );
  },
};
