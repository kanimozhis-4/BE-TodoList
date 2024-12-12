const express = require("express");
const router = express.Router();
const path = require("path");
const Joi = require("joi");
const controller = require(path.join(
  __dirname,
  "..",
  "controllers",
  "tasks.controller.js"
));

const taskSchema = Joi.object({
  content: Joi.string().min(2).required(),
  description: Joi.string().optional(),
  due_date: Joi.date().optional(),
  is_completed: Joi.boolean().optional(),
  project_id: Joi.number().integer().required(),
  user_id: Joi.number().integer().required(),
});

const validateTask = (req, res, next) => {
  const { error } = taskSchema.validate(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  next();
};

router.post("/", validateTask, controller.createTask);
// update one data using id
router.put("/:id", validateTask, controller.updateById);
// filter by data
router.get("/filter", controller.filterByData);
// get one data by id
router.get("/:id", controller.getById);
// delte by id
router.delete("/delete/:id", controller.deleteById);
// delete all Data
router.delete("/", controller.deleteAllData);
// get all data from both table
router.get("/", controller.getAllData);

module.exports = router;
