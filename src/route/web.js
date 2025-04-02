import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  // router.get("/", (req, res) => {
  //   return res.status(200).json("Hello world");
  // });

  // router.post("/register", createUser);

  return app.use("/", router);
};

module.exports = initWebRoutes; //export default
