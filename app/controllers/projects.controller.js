const path = require("path");
const logger = require(path.join(__dirname, "..", "utils", "logger.js"));

const servicePath = require(path.join(
  __dirname,
  "..",
  "services",
  "projects.service.js"
));

exports.createProject = (req, res) => {
  const Data = {
    name: req.body.name,
    color: req.body.color,
    is_favorite: req.body.is_favorite || false,
    user_id: req.user.id,
  };

  servicePath
    .createProject(Data)
    .then((data) => {
      logger.info(`Project created: ${JSON.stringify(data)}`);
      res.status(201).send({
        message: `Project created successfully in the Id: ${data.project_id}`,
        id: data.project_id,
        data: data,
      });
    })
    .catch((err) => {
      logger.error(`Error in createProject: ${err.message}`);
      res.status(500).send({ message: `Error in createProject: ${err}` });
    });
};

exports.getAllData = (req, res) => {
  const userId = req.user.id;
  servicePath
    .getAllData(userId)
    .then((data) => {
      logger.info(`Fetched ${data.length} projects`);
      res.send({
        message: `Fetched all projects`,
        data: data,
      });
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
    user_id: req.user.id,
  };
  const id = req.params.id;

  servicePath
    .updateById(Data, id)
    .then((data) => {
      logger.info(`Project with ID: ${Data.id} updated successfully`);
      res.send({
        message: `updated successfully in the Id: ${id}`,
        id: id,
        data: data,
      });
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

  servicePath
    .getById(Id)
    .then((data) => {
      logger.info(`Project found: ${JSON.stringify(data)}`);
      if (!data) {
        logger.warn(`No project found with ID: ${Id}`);
        return res.status(404).send({
          message: `Project with ID ${Id} not found`,
        });
      }
      res.send({
        message: `Fetched Project with ID: ${data.project_id}`,
        id: data.project_id,
        data: data,
      });
    })
    .catch((err) => {
      logger.warn(`Project with ID ${Id} not found`);
      res.status(err.statusCode || 500).send({
        message: err.message || "Internal Server Error",
      });
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

  servicePath
    .deleteById(Id)
    .then(() => {
      logger.info(`Project with ID ${Id} deleted successfully`);
      res.send({ message: `deleted the successfully with ID :${Id}`, id: Id });
    })
    .catch((err) => {
      logger.error(`Error deleting project with ID ${Id}: ${err.message}`);
      res.status(err.statusCode || 500).send({
        message: err.message || "Internal Server Error",
      });
    });
};
