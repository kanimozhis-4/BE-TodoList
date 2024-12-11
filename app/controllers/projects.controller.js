const path = require("path");
const modelPath = require(path.join(
  __dirname,
  "..",
  "models",
  "projects.model.js"
));

exports.createProject = (req, res) => {
  const requiredKeys = ["name", "color"];
  const missingKeys = validatePayload(req.body, requiredKeys);

  if (missingKeys) {
    return res.status(400).send({
      message: `Missing required keys: ${missingKeys.join(", ")}`,
    });
  }

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
  const requiredKeys = ["name", "color"];
  const missingKeys = validatePayload(req.body, requiredKeys);

  if (missingKeys) {
    return res.status(400).send({
      message: `Missing required keys: ${missingKeys.join(", ")}`,
    });
  }

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

const validatePayload = (payload, requiredKeys) => {
  const payloadKeys = new Set(Object.keys(payload));
  const missingKeys = requiredKeys.filter((key) => !payloadKeys.has(key));
  return missingKeys.length > 0 ? missingKeys : null;
};
