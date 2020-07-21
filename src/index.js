import express from "express";
import path from "path";

import mainController from "./controllers/main";
import todoController from "./controllers/todo";
const app = express();

// set up template engine
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

//static files
app.use("/static", express.static(path.join(__dirname, "assets")));

//fire controllers
mainController(app);
todoController(app);

// listen to port
app.listen(3000, () => {
  console.log("listening on port 3000");
});
