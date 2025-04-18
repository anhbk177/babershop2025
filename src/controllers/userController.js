import db from "../models/index";
import userService from "../services/userService";

let handleLogin = async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  //check exist
  if (!username || !password) {
    return res.status(500).json({
      err: 1,
      message: "Vui lòng nhập đầy đủ username và password",
      userData,
    });
  }
  let userData = await userService.handleLogin(username, password);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

module.exports = {
  handleLogin: handleLogin,
};
