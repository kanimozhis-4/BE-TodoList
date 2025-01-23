const path = require("path");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/users.model");

const modelPath = require(path.join(
  __dirname,
  "..",
  "services",
  "users.service.js"
));
const logger = require(path.join(__dirname, "..", "utils", "logger.js"));

// Create a new user
exports.createUser = (req, res) => {
  const Data = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password_code: req.body.password_code,
  }; 
  bcrypt.hash(Data.password_code, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).send({ error: "Password hashing error" });
    }

    const newUser = {
      first_name: Data.first_name,
      last_name: Data.last_name,
      email: Data.email,
      password_code: hashedPassword,
    };
    modelPath
      .createUser(newUser)
      .then((data) => {
        res.status(201).send({
          message: `User created successfully in the Id: ${data.user_id}`,
          id: data.user_id,
          data: data,
        });
      })
      .catch((err) => {
        logger.error(`Error in createUser: ${err.message || err}`);
        res.status(500).send({
          message: `Error in createUser: ${err.message || err}`,
        });
      });
  });
};
exports.loginUser = async (req, res) => {
  const { email, password_code } = req.body;

  if (!email || !password_code) {
    return res.status(400).send({ message: "Email and Password are required" });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password_code, user.password_code);

    if (!isMatch) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    const token = jsonwebtoken.sign(
      { user: { id: user.user_id, email: user.email } },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
      expires: new Date(Date.now() + 30 * 60 * 1000),
    });

    res.status(200).send({ message: "Login successful", token ,email});
  } catch (err) {
    logger.error("Error in login:", err);
    res
      .status(500)
      .send({ message: `Internal server error`, error: err.message });
  }
};
