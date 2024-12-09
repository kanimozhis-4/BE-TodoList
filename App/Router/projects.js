const express=require('express');
const router = express.Router();
const path=require('path')
const controller = require(path.join(__dirname,'..','Controller','projects.js'));
// create project
router.post('/createProject',controller.createProject); 
// get all data from both table
router.get('/',controller.getAllData);
// get one data by id 
router.get("/get/:id", controller.getById);
// update one data using id
router.put("/update/:id", controller.updateById);
// delete by id 
router.delete("/delete/:id", controller.deleteById);
// delete all Data
router.delete("/delete", controller.deleteAllData);
  
module.exports=router;