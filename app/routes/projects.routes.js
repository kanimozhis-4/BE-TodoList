const express = require("express");
const router = express.Router();
const path = require("path");
const Joi = require("joi");
const controller = require(path.join(
  __dirname,
  "..",
  "controllers",
  "projects.controller.js"
));

const projectSchema = Joi.object({
  name: Joi.string().required(),
  color: Joi.string().min(3).required(),
  is_favorite: Joi.boolean().optional(),
});
const validateProject = (req, res, next) => {
  const { error } = projectSchema.validate(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  next();
};

// create project
router.post("/", validateProject, controller.createProject);

// // get one data by id
router.get("/:id", controller.getById);

// // get all data by user_id
router.get("/", controller.getAllData);

// // update one data using id
router.put("/:id", validateProject, controller.updateById);

// // delete by id
router.delete("/delete/:id", controller.deleteById);

module.exports = router;
