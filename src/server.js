require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";

// const { getHomepage } = require("./controllers/homeController");
// const cors = require("cors");
let app = express();

// Cấu hình body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());
// Cấu hình view engine và routes
viewEngine(app);
initWebRoutes(app);

// database
connectDB();

let port = process.env.PORT || 8888;

app.listen(port, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${port}`);
});
//////////////////////
// connection();

// webAPI.get("/", getHomepage);
// app.use("/", webAPI);
//khai báo route
// app.use("/v1/api/", apiRoutes);
