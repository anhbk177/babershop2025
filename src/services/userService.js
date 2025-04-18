import db from "../models/index";
import bcrypt from "bcryptjs";

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

module.exports = {
  handleLogin,
};
