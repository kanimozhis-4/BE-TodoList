const express = require("express");
const router = express.Router();
const path = require("path");
const Joi = require("joi");

// Import the users controller
const controller = require(path.join(
  __dirname,
  "..",
  "controllers",
  "users.controller.js"
));

const userSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
});

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  next();
};
// Create a new user
router.post("/", validateUser, controller.createUser);

// Update user by ID
router.put("/:id", validateUser, controller.updateById);

// Filter users by specific criteria
router.get("/filter", controller.filterByData);

// Get a single user by ID
router.get("/:id", controller.getById);

// Delete a user by ID
router.delete("/delete/:id", controller.deleteById);

// Delete all users
router.delete("/", controller.deleteAllData);
// get all data from both table
router.get("/", controller.getAllData);

module.exports = router;
