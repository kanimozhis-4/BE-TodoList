const express=require('express');
const router = express.Router();
const path=require('path')
const controller = require(path.join(__dirname,'..','Controller','tasks.js'));
router.post('/createTask',controller.createTask);
  // update one data using id
router.put("/update/:id", controller.updateById);
 // get one data by id 
router.get("/get/:id", controller.getById); 
// delte by id 
router.delete("/delete/:id", controller.deleteById);
// delete all Data
router.delete("/delete", controller.deleteAllData);
module.exports=router;