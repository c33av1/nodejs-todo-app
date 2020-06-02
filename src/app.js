import express from "express";
import todoController from "./controllers/todo";

const app = express();

// set up template engine
app.set("view_engine", "ejs");

//static files
app.use("/assets", express.static("./public"));

//fire controllers
todoController(app);

// listen to port
app.listen(3000);
console.log("listening on port 3000");