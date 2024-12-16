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
  name: Joi.string().min(2).required(),
  color: Joi.string().min(3).required(),
  is_favorite: Joi.boolean().optional(),
  user_id: Joi.number().required(),
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
// filter by data
router.get("/filter", controller.filterByData);
// get one data by id
router.get("/:id", controller.getById);
// get all data from both table
router.get("/", controller.getAllData);
// update one data using id
router.put("/:id", validateProject, controller.updateById);
// delete by id
router.delete("/delete/:id", controller.deleteById);
// delete all Data
router.delete("/", controller.deleteAllData);

module.exports = router;
