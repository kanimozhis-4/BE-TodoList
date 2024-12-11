const express=require('express');
const router = express.Router();
const path=require('path')
const controller = require(path.join(__dirname,'..','controllers','tasks.controller.js'));
router.post('/',controller.createTask);
  // update one data using id
router.put("/:id", controller.updateById);
// filter by data 
router.get('/data', controller.filterByData);
 // get one data by id  
router.get("/:id", controller.getById); 
// delte by id 
router.delete("/delete/:id", controller.deleteById);
// delete all Data
router.delete("/", controller.deleteAllData); 

module.exports=router;