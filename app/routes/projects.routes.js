const express=require('express');
const router = express.Router();
const path=require('path')
const controller = require(path.join(__dirname,'..','controllers','projects.controller.js'));
// const fakeData=require(path.join(__dirname,'..','controllers','generate.fake.data.controller.js'))
// router.post('/fakeData',fakeData.generateFakeData);
// create project
router.post('/',controller.createProject); 
// get all data from both table
router.get('/',controller.getAllData);
// get one data by id 
router.get("/:id", controller.getById);
// update one data using id
router.put("/:id", controller.updateById);
// delete by id 
router.delete("/delete/:id", controller.deleteById);
// delete all Data
router.delete("/", controller.deleteAllData);
  
module.exports=router;