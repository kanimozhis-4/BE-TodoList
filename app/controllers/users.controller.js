const path = require("path");
const modelPath = require(path.join(
  __dirname,
  "..",
  "models",
  "users.model.js"
));

// Create a new user
exports.createUser = (req, res) => {
  const Data = {
    name: req.body.name,
    email: req.body.email,
  };

  modelPath
    .createUser(Data)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error in createUser: ${err.message || err}`,
      });
    });
};

exports.getAllData = (req, res) => {
  modelPath
    .getAllData()
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({ message: `Error in getAllData: ${err}` })
    );
};

// Update a user by ID
exports.updateById = (req, res) => {
  const Data = {
    name: req.body.name,
    email: req.body.email,
    user_id: req.params.id,
  };

  modelPath
    .updateById(Data)
    .then(() => {
      res.send({ message: `Updated successfully for ID: ${Data.user_id}` });
    })
    .catch((err) => {
      res.status(err.statusCode || 500).send(err);
    });
};

// Get a user by ID
exports.getById = (req, res) => {
  const Id = parseInt(req.params.id);
  if (!Id) {
    return res.status(400).send({
      message: "User ID is required!",
    });
  }

  modelPath
    .getById(Id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(err.statusCode || 500).send(err);
    });
};

// Delete a user by ID
exports.deleteById = (req, res) => {
  const Id = req.params.id;
  if (!Id) {
    return res.status(400).send({
      message: "User ID is required!",
    });
  }

  modelPath
    .deleteById(Id)
    .then(() => {
      res.send({ message: `Deleted successfully with ID: ${Id}` });
    })
    .catch((err) => {
      res.status(err.statusCode || 500).send(err);
    });
};

// Delete all users
exports.deleteAllData = (req, res) => {
  modelPath
    .deleteAllData()
    .then(() => {
      res.send({ message: "All users deleted successfully!" });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error in deleteAllData: ${err.message || err}`,
      });
    });
};

// Filter users based on query parameters
exports.filterByData = (req, res) => {
  const queryParam = req.query;
  if (Object.keys(queryParam).length === 0) {
    return res.status(400).send({
      message: "No query parameters provided.",
    });
  }

  const allowedKeys = ["name", "email", "user_id"];
  const key = Object.keys(queryParam)[0];

  if (!allowedKeys.includes(key)) {
    console.log("key", key);
    return res.status(400).send({
      message: `Invalid key: ${key}. Allowed keys are: ${allowedKeys.join(
        ", "
      )}`,
    });
  }

  const value = queryParam[key];

  modelPath
    .filterByData(key, value)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(err.statusCode || 500).send({
        message: `Error filtering data by ${key}: ${err.message || err}`,
      });
    });
};
