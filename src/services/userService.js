import { where } from "sequelize";
import db from "../models/index";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
let checkUserName = async (username) => {
  let user = await db.User.findOne({ where: { username } });
  return !!user;
};

let checkCCCD = async (cccd) => {
  let user = await db.User.findOne({ where: { CCCD: cccd } });
  return !!user;
};
let createNewUser = async (data) => {
  try {
    // Kiểm tra username
    let usernameExists = await checkUserName(data.username);
    if (usernameExists) {
      return {
        errCode: 2,
        message: "Username đã tồn tại",
      };
    }

    // Kiểm tra CCCD
    let cccdExists = await checkCCCD(data.cccd);
    if (cccdExists) {
      return {
        errCode: 3,
        message: "CCCD đã được sử dụng cho một tài khoản khác",
      };
    }

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

    return { errCode: 0, message: "Tạo user thành công." };
  } catch (error) {
    console.error("Lỗi khi tạo user:", error);
    return {
      errCode: 1,
      message: "Lỗi khi tạo user",
      error: error?.message || error,
    };
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

let handleLogin = async (username, password) => {
  try {
    let userData = {};

    // Truy vấn toàn bộ user để kiểm tra mật khẩu
    let userWithPassword = await db.User.findOne({
      where: { username: username },
    });

    if (!userWithPassword) {
      userData.errCode = 1;
      userData.errMessage = "Username không tồn tại";
    } else {
      const check = bcrypt.compareSync(password, userWithPassword.password);
      if (check) {
        // Sau khi kiểm tra mật khẩu xong, truy vấn lại mà không lấy password
        const user = await db.User.findOne({
          where: { username: username },
          attributes: { exclude: ["password", "CCCD"] },
          raw: true,
        });

        userData.errCode = 0;
        userData.errMessage = "Đăng nhập thành công";
        userData.user = user;
      } else {
        userData.errCode = 2;
        userData.errMessage = "Sai mật khẩu";
      }
    }

    return userData;
  } catch (e) {
    throw e;
  }
};

let getAllUsers = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (!id || id === "ALL") {
        users = await db.User.findAll({
          attributes: { exclude: ["password"] }, // Bỏ thông tin nhạy cảm nếu muốn
        });
      }
      if (id && id != "ALL") {
        users = await db.User.findOne({
          where: { id: id },
          attributes: { exclude: ["password"] },
        });
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};
//edit user
let getUserInfoById = async (id) => {
  try {
    let user = await db.User.findOne({
      where: { id: id },
      raw: false,
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
      if (!data.id) {
        return resolve({
          errCode: 2,
          message: "khong tim thay nguoi dung",
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
      });
      if (user) {
        user.first_name = data.firstname;
        user.last_name = data.lastname;
        user.address = data.address;
        user.email = data.email;
        user.phone = data.phone;
        user.birthday = data.birthday;
        user.gender = data.gender;
        user.role = data.role;
        user.status = data.status;
        user.CCCD = data.cccd;

        await user.save();

        resolve({
          errCode: 0,
          message: "sua thanh cong",
        });
      } else {
        resolve({
          errCode: 1,
          message: "khong tim thay nguoi dung",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let deleteUserById = async (id) => {
  try {
    const user = await db.User.findOne({ where: { id } });

    if (!user) {
      return { errCode: 1, message: "Không tìm thấy user" };
    }

    await user.destroy();
    return { errCode: 0, message: "Xóa user thành công" };
  } catch (error) {
    console.error("Lỗi khi xóa user:", error);
    return {
      errCode: 2,
      message: "Lỗi xóa user",
      error: error.message || error,
    };
  }
};

//list customers
let getAllCustomers = async () => {
  try {
    const customers = await db.User.findAll({
      where: { role: "customer" },
      attributes: { exclude: ["password", "CCCD"] },
    });
    return customers;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  handleLogin,
  getAllUsers,
  createNewUser,
  deleteUserById,
  getUserInfoById,
  updateUserData,
  getAllCustomers,
};
