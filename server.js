const express=require('express');
const app=express()
const path = require('path');
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require('cors');
app.use(cors());
const TaskRouterPath=require(path.join(__dirname, "App", "Router", "tasks.js"))
const ProjectRouterPath=require(path.join(__dirname, "App", "Router", "projects.js"))
app.use('/todoList',ProjectRouterPath);
app.use('/todoList/task',TaskRouterPath);
app.use('/todoList/project',ProjectRouterPath);

// require(path.join(__dirname, "app", "Router", "router.js"))(app);


app.listen(PORT,()=>console.log(`server is running on port ${PORT}`));