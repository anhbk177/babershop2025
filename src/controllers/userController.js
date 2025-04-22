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

let handleGetAllUsers = async (req, res) => {
  try {
    const id = req.query.id;

    const users = await userService.getAllUsers(id);

    return res.status(200).json({
      errCode: 0,
      message: "OK",
      users,
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách user:", error);
    return res.status(500).json({
      errCode: -1,
      message: "Đã xảy ra lỗi phía server",
    });
  }
};

let postUser = async (req, res) => {
  console.log("Received request body:", req.body);
  let message = await userService.createNewUser(req.body);
  return res.status(200).json(message);
};

let handleEditUser = async (req, res) => {
  let data = req.body;
  let message = await userService.updateUserData(data);
  return res.status(200).json(message);
};

let handleDeleteUser = async (req, res) => {
  const id = req.body.id; // Thêm dòng này để khai báo id
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      message: "chua chon nguoi dung",
    });
  }

  console.log("Delete request for user ID:", id);

  const message = await userService.deleteUserById(req.body.id);
  console.log("Delete result:", message);

  return res.status(200).json(message);
};

//customer
let handleGetAllCustomers = async (req, res) => {
  try {
    const customers = await userService.getAllCustomers();

    return res.status(200).json({
      errCode: 0,
      message: "Lấy danh sách khách hàng thành công",
      customers,
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách khách hàng:", error);
    return res.status(500).json({
      errCode: -1,
      message: "Đã xảy ra lỗi phía server",
    });
  }
};

module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  postUser: postUser,
  handleEditUser: handleEditUser,
  handleDeleteUser: handleDeleteUser,
  //
  handleGetAllCustomers: handleGetAllCustomers,
};
