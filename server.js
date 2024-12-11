const express=require('express');
const app=express()
const path = require('path');
require('dotenv').config();
const PORT = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require('cors');
app.use(cors());
const TaskRouterPath=require(path.join(__dirname, "app", "routes", "tasks.routes.js"))
const ProjectRouterPath=require(path.join(__dirname, "app", "routes", "projects.routes.js"))
app.use('/todoList',ProjectRouterPath);
app.use('/todoList/task',TaskRouterPath);
app.use('/todoList/project',ProjectRouterPath);



app.listen(PORT,()=>console.log(`server is running on port ${PORT}`));