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
  const queryParams = req.query;

  if (Object.keys(queryParams).length === 0) {
  return res.status(400).send({ message: "No query parameters provided." });
  } 
  const { keys, values, error } = validateQueryKeys(queryParams);

  if (error) {
    return res.status(400).send({ message: error });
  }

modelPath
  .filterByData(keys, values)
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res.status(err.statusCode || 500).send({
      message: `Error filtering data by ${keys}: ${err.message || err}`,
    });
  });
}; 
function validateQueryKeys(queryParams) {
  const allowedKeys = ["project_id","name","color","is_favorite", "created_at"];
  const keys = [];
  const values = [];

  for (const [key, value] of Object.entries(queryParams)) {
    if (!allowedKeys.includes(key)) {
      return { error: `Invalid key: ${key}. Allowed keys are: ${allowedKeys.join(", ")}` };
  }
    // Add key and value directly without type checks
    keys.push(`${key} = ?`);
    values.push(value);
  }

  return { keys, values };
}
