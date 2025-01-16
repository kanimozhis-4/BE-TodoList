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
const jsonwebtoken = require('jsonwebtoken');

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
const validateAuthorizeUser=(req,res,next)=>{

  const tokenFromCookies = req.cookies?.token;
  const authHeader = req.headers['authorization'];
  let token;

  if (authHeader) {
    token = authHeader.split(' ')[1]; 
  } else if (tokenFromCookies) {
    token = tokenFromCookies;
  }

  if (!token) {
    return res.status(401).send({ message: 'Access Denied. No Token Provided' });
  } 
  try {
    const verified = jsonwebtoken.verify(token, process.env.SECRET_KEY);
    req.user = verified.user; 
    console.log("verifieddd",verified)
    next(); 
  } catch (err) {
    res.status(400).send({ message: 'Invalid Token' });
  }
}
// app.use("/todoList/task",validateAuthorizeUser, taskPath);
// app.use("/todoList/project",validateAuthorizeUser, projectPath);
// app.use("/todoList/user", userPath);
// app.use("/todoList/comment",validateAuthorizeUser, commentPath); 
app.use("/todoList/task", taskPath);
app.use("/todoList/project", projectPath);
app.use("/todoList/user", userPath);
app.use("/todoList/comment", commentPath);

app.listen(PORT, () => logger.info(`Server is running on port ${PORT}`));
