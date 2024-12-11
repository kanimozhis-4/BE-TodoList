const express=require('express');
const app=express()
const path = require('path');
require('dotenv').config();
const PORT = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require('cors');
app.use(cors());
const taskPath=require(path.join(__dirname, "app", "routes", "tasks.routes.js"))
const projectPath=require(path.join(__dirname, "app", "routes", "projects.routes.js"))
const userPath=require(path.join(__dirname, "app", "routes", "users.routes.js"))
app.use('/todoList',projectPath);
app.use('/todoList/task',taskPath);
app.use('/todoList/project',projectPath);
app.use('/todoList/user',userPath);



app.listen(PORT,()=>console.log(`server is running on port ${PORT}`));