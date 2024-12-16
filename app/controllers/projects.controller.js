const path = require("path");
const logger = require(path.join(__dirname, "..", "utils", "logger.js"));

const modelPath = require(path.join(
  __dirname,
  "..",
  "models",
  "projects.model.js"
));

exports.createProject = (req, res) => {
  const Data = {
    name: req.body.name,
    color: req.body.color,
    is_favorite: req.body.is_favorite || false,
  };

  modelPath
    .createProject(Data)
    .then((data) => {
      logger.info(`Project created: ${JSON.stringify(data)}`);
      res.status(201).send(data);
    })
    .catch((err) => {
      logger.error(`Error in createProject: ${err.message}`);
      res.status(500).send({ message: `Error in createProject: ${err}` });
    });
};

exports.getAllData = (req, res) => {
  modelPath
    .getAllData()
    .then((data) => {
      logger.info(`Fetched ${data.length} projects`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error in getAllData: ${err}`);
      res.status(500).send({ message: `Error in getAllData: ${err}` });
    });
};

exports.updateById = (req, res) => {
  const Data = {
    name: req.body.name,
    color: req.body.color,
    is_favorite: req.body.is_favorite || false,
    id: req.params.id,
  };

  modelPath
    .updateById(Data)
    .then(() => {
      logger.info(`Project with ID: ${Data.id} updated successfully`);
      res.send({ message: `updated successfully in the Id: ${Data.id}` });
    })
    .catch((err) => {
      logger.error(`Error updating project with ID ${Data.id}: ${err.message}`);
      res.status(err.statusCode).send(err);
    });
};

exports.getById = (req, res) => {
  const Id = req.params.id;
  if (!Id) {
    logger.warn(`Project ID not provided`);
    return res.status(400).send({
      message: "ID is required!",
    });
  }

  modelPath
    .getById(Id)
    .then((data) => {
      logger.info(`Project found: ${JSON.stringify(data)}`);
      res.send(data);
    })
    .catch((err) => {
      logger.warn(`Project with ID ${Id} not found`);
      res.status(err.statusCode).send(err);
    });
};

exports.deleteById = (req, res) => {
  const Id = req.params.id;
  if (!Id) {
    logger.warn(`Project ID not provided`);
    return res.status(400).send({
      message: "ID is required!",
    });
  }

  modelPath
    .deleteById(Id)
    .then(() => {
      logger.info(`Project with ID ${Id} deleted successfully`);
      res.send({ message: `deleted the successfully with ID :${Id}` });
    })
    .catch((err) => {
      logger.error(`Error deleting project with ID ${Id}: ${err.message}`);
      res.status(err.statusCode).send(err);
    });
};

exports.deleteAllData = (req, res) => {
  modelPath
    .deleteAllData()
    .then(() => {
      logger.info(`All projects deleted successfully`);
      res.send({ message: "All projects deleted successfully!" });
    })
    .catch((err) => {
      logger.error(`Error in deleteAllData: ${err.message}`);
      res.status(500).send({
        message: `Error in deleteAllData: ${err.message || err}`,
      });
    });
};
// Filter tasks based on query parameters
exports.filterByData = (req, res) => {
  const queryParams = req.query;

  if (Object.keys(queryParams).length === 0) {
    logger.warn(`No query parameters provided for filtering`);
    return res.status(400).send({ message: "No query parameters provided." });
  }
  const { keys, values, error } = validateQueryKeys(queryParams);

  if (error) {
    logger.warn(`Invalid query keys: ${error}`);
    return res.status(400).send({ message: error });
  }

  modelPath
    .filterByData(keys, values)
    .then((data) => {
      logger.info(`Filtering result: Found ${data.length} projects`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error filtering data: ${err.message}`);
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
    "user_id",
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
