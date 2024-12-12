const express = require("express");
const router = express.Router();
const path = require("path");
const Joi = require("joi");

// Import the comments controller
const controller = require(path.join(
  __dirname,
  "..",
  "controllers",
  "comments.controller.js"
));

const commentSchema = Joi.object({
  user_id: Joi.number().integer().required(),
  project_id: Joi.number().integer().required(),
  task_id: Joi.number().integer().optional(),
  content: Joi.string().min(1).required(),
});

const validateComment = (req, res, next) => {
  const { error } = commentSchema.validate(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  next();
};

// Create a new comment
router.post("/", validateComment, controller.createComment);

// Update a comment by ID
router.put("/:id", validateComment, controller.updateById);

// Filter comments by specific criteria
router.get("/filter", controller.filterByData);

// Get a single comment by ID
router.get("/:id", controller.getById);

// Delete a comment by ID
router.delete("/delete/:id", controller.deleteById);

// Delete all comments
router.delete("/", controller.deleteAllData);
// get all data from both table
router.get("/", controller.getAllData);

module.exports = router;
