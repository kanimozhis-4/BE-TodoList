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
  first_name: Joi.string().min(2).max(255).required(),
  last_name: Joi.string().max(255).required(),
  email: Joi.string().email().required(),
  password_code: Joi.string().min(6).required(),
});

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).send({ message: error?.details?.[0]?.message });
  }
  next();
};

router.post("/register", validateUser, controller.createUser);

router.post("/login", controller.loginUser);

module.exports = router;
