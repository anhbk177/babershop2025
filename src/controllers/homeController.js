import { json, raw } from "body-parser";
import db from "../models/index";
import register from "../services/register";
let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    // console.log(data);

    return res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
  }
};

let getAbout = (req, res) => {
  return res.render("about.ejs");
};

let getHairStyle = (req, res) => {
  return res.render("register.ejs");
};
let getUser = async (req, res) => {
  let data = await register.getAllUser();
  // console.log(data);
  return res.render("user.ejs", {
    dataTable: data,
  });
};

let postUser = async (req, res) => {
  console.log("Received request body:", req.body);
  let message = await register.createNewUser(req.body);
  console.log(message);
  return res.send("User created successfully!");
};

let updateUser = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await register.getUserInfoById(userId);

    return res.render("updateUser.ejs", {
      userData: userData,
    });
  } else {
    return res.send("User not found");
  }
};

let putUser = async (req, res) => {
  let data = req.body;
  let allUser = await register.updateUserData(data);

  return res.render("user.ejs", {
    dataTable: allUser,
    raw: true,
  });
};
let deleteUser = async (req, res) => {
  let id = req.query.id;
  if (id) {
    await register.deleteUserById(id);
    return res.send("DONE");
  } else {
    return res.send("user not found");
  }
};

module.exports = {
  getHomePage: getHomePage,
  getAbout: getAbout,
  getHairStyle: getHairStyle,
  postUser: postUser,
  getUser: getUser,
  updateUser: updateUser,
  putUser: putUser,
  deleteUser: deleteUser,
};
