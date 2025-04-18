import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/register", homeController.getHairStyle);

  router.post("/post-user", homeController.postUser);
  router.get("/get-user", homeController.getUser);
  router.get("/update-user", homeController.updateUser);
  router.post("/put-user", homeController.putUser);
  router.get("/delete-user", homeController.deleteUser);

  router.post("/api/login", userController.handleLogin);
  return app.use("/", router);
};

module.exports = initWebRoutes; //export default
