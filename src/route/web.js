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

  //user
  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post("/api/register", userController.postUser);
  router.put("/api/edit-user", userController.handleEditUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);
  //customer
  router.get("/api/get-all-customers", userController.handleGetAllCustomers);
  //service
  return app.use("/", router);

  //employee

  //package-service
  //booking
  //statistic
};

module.exports = initWebRoutes; //export default
