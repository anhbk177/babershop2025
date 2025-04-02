const path = require("path");
import express from "express";

let configViewEngine = (app) => {
  app.set("views", path.join("./src", "views"));
  app.set("view engine", "ejs");

  //config static files: image/css/js
  //   app.use(express.static(path.join("./src", "public")));
  app.use(express.static("./src/public"));
};

module.exports = configViewEngine;
