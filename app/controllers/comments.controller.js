const path = require("path");
const modelPath = require(path.join(__dirname, "..", "models", "comments.model.js"));

// Create a new comment
exports.createComment = (req, res) => {
  const requiredKeys = ["user_id", "project_id", "content"];
  const missingKeys = validatePayload(req.body, requiredKeys);

  if (missingKeys) {
    return res.status(400).send({
      message: `Missing required keys: ${missingKeys.join(", ")}`,
    });
  }

  const Data = {
    user_id: req.body.user_id,
    project_id: req.body.project_id,
    task_id: req.body.task_id || null,
    content: req.body.content,
  };

  modelPath
    .createComment(Data)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error in createComment: ${err.message || err}`,
      });
    });
};

// Update a comment by ID
exports.updateById = (req, res) => {
  const requiredKeys = ["content"];
  const missingKeys = validatePayload(req.body, requiredKeys);

  if (missingKeys) {
    return res.status(400).send({
      message: `Missing required keys: ${missingKeys.join(", ")}`,
    });
  }

  const Data = {
    comment_id: req.params.id,
    content: req.body.content,
  };

  modelPath
    .updateById(Data)
    .then(() => {
      res.send({ message: `Updated successfully for ID: ${Data.comment_id}` });
    })
    .catch((err) => {
      res.status(err.statusCode || 500).send(err);
    });
};

// Get a comment by ID
exports.getById = (req, res) => {
  const Id = parseInt(req.params.id);
  if (!Id) {
    return res.status(400).send({ message: "Comment ID is required!" });
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

// Delete a comment by ID
exports.deleteById = (req, res) => {
  const Id = req.params.id;
  if (!Id) {
    return res.status(400).send({ message: "Comment ID is required!" });
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

// Delete all comments
exports.deleteAllData = (req, res) => {
  modelPath
    .deleteAllData()
    .then(() => {
      res.send({ message: "All comments deleted successfully!" });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error in deleteAllData: ${err.message || err}`,
      });
    });
};

// Filter comments based on query parameters
exports.filterByData = (req, res) => {
  const queryParam = req.query;
  if (Object.keys(queryParam).length === 0) {
    return res.status(400).send({ message: "No query parameters provided." });
  }

  const allowedKeys = ["user_id", "project_id", "task_id", "content"];
  const key = Object.keys(queryParam)[0];

  if (!allowedKeys.includes(key)) {
    return res.status(400).send({
      message: `Invalid key: ${key}. Allowed keys are: ${allowedKeys.join(", ")}`,
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

// Validate incoming data
const validatePayload = (payload, requiredKeys) => {
  const payloadKeys = new Set(Object.keys(payload));
  const missingKeys = requiredKeys.filter((key) => !payloadKeys.has(key));
  return missingKeys.length > 0 ? missingKeys : null;
};
