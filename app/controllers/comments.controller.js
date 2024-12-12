const path = require("path");
const modelPath = require(path.join(
  __dirname,
  "..",
  "models",
  "comments.model.js"
));

// Create a new comment
exports.createComment = (req, res) => {
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

exports.getAllData = (req, res) => {
  modelPath
    .getAllData()
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({ message: `Error in getAllData: ${err}` })
    );
};

// Update a comment by ID
exports.updateById = (req, res) => {
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
    const allowedKeys = ["user_id", "project_id", "task_id", "content", "comment_id"];
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
