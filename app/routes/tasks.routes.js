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
  content: Joi.string().required(),
  description: Joi.string().allow(null).optional(),
  due_date: Joi.date().allow(null).optional(),
  is_completed: Joi.boolean().allow(null).optional(),
  project_id: Joi.number().integer().required(),
});

const validateTask = (req, res, next) => {
  const { error } = taskSchema.validate(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  next();
};
// create new task
router.post("/", validateTask, controller.createTask);

// update one data using id
router.put("/:id", validateTask, controller.updateById);

// get one data by id
router.get("/:id", controller.getById);

// delete by id
router.delete("/delete/:id", controller.deleteById);

// // get all task data by user_id
router.get("/", controller.getAllData);

module.exports = router;
