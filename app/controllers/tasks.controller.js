const path = require("path");
const modelPath = require(path.join(
  __dirname,
  "..",
  "models",
  "tasks.model.js"
));

// Create a new task
exports.createTask = (req, res) => {
  const Data = {
    content: req.body.content,
    description: req.body.description,
    due_date: req.body.due_date,
    is_completed: req.body.is_completed || false,
    user_id: req.body.user_id,
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

exports.getAllData = (req, res) => {
  modelPath
    .getAllData()
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({ message: `Error in getAllData: ${err}` })
    );
};

// Update a task by ID
exports.updateById = (req, res) => {
  const Data = {
    content: req.body.content,
    description: req.body.description,
    due_date: req.body.due_date,
    is_completed: req.body.is_completed || false,
    project_id: req.body.project_id,
    user_id: req.body.user_id,
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
  const allowedKeys = [ "project_id","content","task_id",
    "due_date",
    "is_completed",
    "created_at",
    "user_id",];
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
