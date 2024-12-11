const path = require("path");
const modelPath = require(path.join(
  __dirname,
  "..",
  "models",
  "tasks.model.js"
));

// Create a new task
exports.createTask = (req, res) => {
  const requiredKeys = ["content", "description", "due_date", "project_id"];
  const missingKeys = validatePayload(req.body, requiredKeys);

  if (missingKeys) {
    return res.status(400).send({
      message: `Missing required keys: ${missingKeys.join(", ")}`,
    });
  }

  const Data = {
    content: req.body.content,
    description: req.body.description,
    due_date: req.body.due_date,
    is_completed: req.body.is_completed || false,
    project_id: req.body.project_id,
  };

  modelPath
    .createTask(Data)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error in createTask: ${err.message || err}`,
      });
    });
};

// Update a task by ID
exports.updateById = (req, res) => {
  const requiredKeys = ["content", "description", "due_date", "project_id"];
  const missingKeys = validatePayload(req.body, requiredKeys);

  if (missingKeys) {
    return res.status(400).send({
      message: `Missing required keys: ${missingKeys.join(", ")}`,
    });
  }

  const Data = {
    content: req.body.content,
    description: req.body.description,
    due_date: req.body.due_date,
    is_completed: req.body.is_completed || false,
    project_id: req.body.project_id,
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

// Get a task by ID
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

// Delete a task by ID
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

// Delete all tasks
exports.deleteAllData = (req, res) => {
  modelPath
    .deleteAllData()
    .then((data) => {
      res.send({ message: "All tasks deleted successfully!" });
    })
    .catch((err) => {
      if (err.statusCode === 404) {
        res.send({ message: "All tasks deleted successfully!" });
      }
      res.status(500).send({
        message: `Error in deleteAllData: ${err.message || err}`,
      });
    });
};

// Filter tasks based on query parameters
exports.filterByData = (req, res) => {
  const queryParam = req.query;
  if (Object.keys(queryParam).length === 0) {
    return res.status(400).send({
      message: "No query parameters provided.",
    });
  }

  const allowedKeys = ["project_id", "due_date", "is_completed", "created_at"];
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

const validatePayload = (payload, requiredKeys) => {
  const payloadKeys = new Set(Object.keys(payload));
  const missingKeys = requiredKeys.filter((key) => !payloadKeys.has(key));
  return missingKeys.length > 0 ? missingKeys : null;
};
