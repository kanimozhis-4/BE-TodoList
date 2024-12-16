const path = require("path");
const modelPath = require(path.join(
  __dirname,
  "..",
  "models",
  "users.model.js"
));
const logger = require(path.join(__dirname, "..", "utils", "logger.js"));

// Create a new user
exports.createUser = (req, res) => {
  const Data = {
    name: req.body.name,
    email: req.body.email,
  };

  modelPath
    .createUser(Data)
    .then((data) => {
      logger.info(`User created successfully: ${data.name}`);
      res.status(201).send(data);
    })
    .catch((err) => {
      logger.error(`Error in createUser: ${err.message || err}`);
      res.status(500).send({
        message: `Error in createUser: ${err.message || err}`,
      });
    });
};

exports.getAllData = (req, res) => {
  modelPath
    .getAllData()
    .then((data) => {
      logger.info("Fetched all users successfully");
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error getting all users: ${err}`);
      res.status(500).send({ message: `Error in getAllData: ${err}` });
    });
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
      logger.info(`User with ID: ${Data.user_id} updated successfully`);
      res.send({ message: `Updated successfully for ID: ${Data.user_id}` });
    })
    .catch((err) => {
      logger.error(
        `Error updating user with ID: ${Data.user_id} - ${err.message}`
      );
      res.status(err.statusCode || 500).send(err);
    });
};

// Get a user by ID
exports.getById = (req, res) => {
  const Id = parseInt(req.params.id);
  if (!Id) {
    logger.warn("User ID is required!");
    return res.status(400).send({
      message: "User ID is required!",
    });
  }

  modelPath
    .getById(Id)
    .then((data) => {
      logger.info(`Fetched user with ID: ${Id}`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error getting user with ID: ${Id} - ${err.message}`);
      res.status(err.statusCode || 500).send(err);
    });
};

// Delete a user by ID
exports.deleteById = (req, res) => {
  const Id = req.params.id;
  if (!Id) {
    logger.warn("User ID is required!");
    return res.status(400).send({
      message: "User ID is required!",
    });
  }

  modelPath
    .deleteById(Id)
    .then(() => {
      logger.info(`User with ID: ${Id} deleted successfully`);
      res.send({ message: `Deleted successfully with ID: ${Id}` });
    })
    .catch((err) => {
      logger.error(`Error deleting user with ID: ${Id} - ${err.message}`);
      res.status(err.statusCode || 500).send(err);
    });
};

// Delete all users
exports.deleteAllData = (req, res) => {
  modelPath
    .deleteAllData()
    .then(() => {
      logger.info("All users deleted successfully");
      res.send({ message: "All users deleted successfully!" });
    })
    .catch((err) => {
      logger.error(`Error deleting all users: ${err.message}`);
      res.status(500).send({
        message: `Error in deleteAllData: ${err.message || err}`,
      });
    });
};

// Filter tasks based on query parameters
exports.filterByData = (req, res) => {
  const queryParams = req.query;

  if (Object.keys(queryParams).length === 0) {
    logger.warn("No query parameters provided.");
    return res.status(400).send({ message: "No query parameters provided." });
  }
  const { keys, values, error } = validateQueryKeys(queryParams);

  if (error) {
    logger.warn(`Invalid query parameters: ${error}`);
    return res.status(400).send({ message: error });
  }

  modelPath
    .filterByData(keys, values)
    .then((data) => {
      logger.info("Filtered users successfully");
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error filtering users by ${keys}: ${err.message}`);
      res.status(err.statusCode || 500).send({
        message: `Error filtering data by ${keys}: ${err.message || err}`,
      });
    });
};
function validateQueryKeys(queryParams) {
  const allowedKeys = [
    "project_id",
    "name",
    "color",
    "is_favorite",
    "created_at",
  ];
  const keys = [];
  const values = [];

  for (const [key, value] of Object.entries(queryParams)) {
    if (!allowedKeys.includes(key)) {
      return {
        error: `Invalid key: ${key}. Allowed keys are: ${allowedKeys.join(
          ", "
        )}`,
      };
    }
    keys.push(`${key} = ?`);
    values.push(value);
  }

  return { keys, values };
}
