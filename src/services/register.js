import { raw } from "body-parser";
import db from "../models/index";
import bcrypt from "bcryptjs";
import { where } from "sequelize";

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  try {
    const hashPassword = await hashUserPassword(data.password);

    await db.User.create({
      username: data.username,
      password: hashPassword,
      first_name: data.firstname,
      last_name: data.lastname,
      address: data.address,
      email: data.email,
      phone: data.phone,
      birth_date: data.birthday,
      CCCD: data.cccd,
      gender:
        data.gender === "1" || data.gender === true || data.gender === "true",
      role: data.role || "customer",
      status: "active",
    });

    return { success: true, message: "Tạo user thành công." };
  } catch (error) {
    console.error("Lỗi khi tạo user:", error);
    return { success: false, message: "Lỗi khi tạo user", error };
  }
};

let hashUserPassword = (password) => {
  return new Promise((resolve, reject) => {
    try {
      const hash = bcrypt.hashSync(password, salt);
      resolve(hash);
    } catch (error) {
      reject(error);
    }
  });
};

//list user
let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = db.User.findAll({
        raw: true,
      });
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

//edit user
let getUserInfoById = async (id) => {
  try {
    let user = await db.User.findOne({
      where: { id: id },
      raw: true,
    });

    if (user) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Lỗi khi sua user:", error);
    return { success: false, message: "Lỗi khi lấy thông tin user", error };
  }
};

let updateUserData = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
      });
      if (user) {
        user.first_name = data.firstname;
        user.last_name = data.lastname;
        user.email = data.email;
        user.phone = data.phone;
        user.CCCD = data.cccd;

        await user.save();

        let allUser = await db.User.findAll();
        resolve(allUser);
      } else {
        resolve();
      }
    } catch (error) {
      console.error("Lỗi khi sửa user:", error);
      return { success: false, message: "Lỗi khi sửa user", error };
    }
  });
};

//edit user
let deleteUserById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: id },
      });

      if (user) {
        await user.destroy();
        resolve({ success: true, message: "Xóa user thành công" });
      } else {
        resolve({ success: false, message: "Không tìm thấy user" });
      }
    } catch (error) {
      console.error("Lỗi khi xóa user:", error);
      return { success: false, message: "Lỗi xóa user", error };
    }
  });
};
export default {
  createNewUser,
  getAllUser,
  getUserInfoById,
  updateUserData,
  deleteUserById,
};
