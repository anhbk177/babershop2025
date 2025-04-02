// const db = require("../models/index");

let getHomePage = async (req, res) => {
  try {
    // let data = await db.User.findAll();
    // console.log("Danh sách Users:", JSON.stringify(data, null, 2));
    return res.render("homepage.ejs");
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getHomePage: getHomePage,
};
