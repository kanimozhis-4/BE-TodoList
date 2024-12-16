const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const PORT = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require("cors");
app.use(cors());
const logger = require('./app/utils/logger.js');

const taskPath = require(path.join(
  __dirname,
  "app",
  "routes",
  "tasks.routes.js"
));
const projectPath = require(path.join(
  __dirname,
  "app",
  "routes",
  "projects.routes.js"
));
const userPath = require(path.join(
  __dirname,
  "app",
  "routes",
  "users.routes.js"
));
const commentPath = require(path.join(
  __dirname,
  "app",
  "routes",
  "comments.routes.js"
));
app.use("/todoList/task", taskPath);
app.use("/todoList/project", projectPath);
app.use("/todoList/user", userPath);
app.use("/todoList/comment", commentPath);

app.listen(PORT, () => logger.info(`Server is running on port ${PORT}`));
