const path = require("path");
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
    .then((data) => res.status(201).send(data))
    .catch((err) =>
      res.status(500).send({ message: `Error in createProject: ${err}` })
    );
};

exports.getAllData = (req, res) => {
  modelPath
    .getAllData()
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({ message: `Error in getAllData: ${err}` })
    );
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
      res.send({ message: `updated successfully in the Id: ${Data.id}` });
    })
    .catch((err) => {
      res.status(err.statusCode).send(err);
    });
};

exports.getById = (req, res) => {
  const Id = req.params.id;
  if (!Id) {
    return res.status(400).send({
      message: "ID is required!",
    });
  }

  modelPath
    .getById(Id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(err.statusCode).send(err);
    });
};

exports.deleteById = (req, res) => {
  const Id = req.params.id;
  if (!Id) {
    return res.status(400).send({
      message: "ID is required!",
    });
  }

  modelPath
    .deleteById(Id)
    .then(() => {
      res.send({ message: `deleted the successfully with ID :${Id}` });
    })
    .catch((err) => {
      res.status(err.statusCode).send(err);
    });
};

exports.deleteAllData = (req, res) => {
  modelPath
    .deleteAllData()
    .then(() => {
      res.send({ message: "All projects deleted successfully!" });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error in deleteAllData: ${err.message || err}`,
      });
    });
};
// Filter tasks based on query parameters
exports.filterByData = (req, res) => {
  console.log("filterbydata");
  const queryParam = req.query;
  if (Object.keys(queryParam).length === 0) {
    return res.status(400).send({
      message: "No query parameters provided.",
    });
  }

  const allowedKeys = ["project_id", "name", "color", "is_favorite"];
  const key = Object.keys(queryParam)[0];

  if (!allowedKeys.includes(key)) {
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
      res.status(err.statusCode).send({
        message: `Error filtering data by ${key}: ${err.message || err}`,
      });
    });
};
