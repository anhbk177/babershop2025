require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";

// const { connection } = require("./config/database"); // Import connection
// const { getHomepage } = require("./controllers/homeController");
// const cors = require("cors");

let app = express();
let port = process.env.PORT || 8888;

//config app
//config cors
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());

viewEngine(app);
initWebRoutes(app);

app.listen(port, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${port}`);
});
//////////////////////
// connection();

// webAPI.get("/", getHomepage);
// app.use("/", webAPI);
//khai báo route
// app.use("/v1/api/", apiRoutes);
