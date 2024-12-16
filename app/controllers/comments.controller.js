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
      logger.info(`Comment created successfully: ${JSON.stringify(data)}`);
      res.status(201).send(data);
    })
    .catch((err) => {
      logger.error(`Error creating comment: ${err.message || err}`);
      res.status(500).send({
        message: `Error in createComment: ${err.message || err}`,
      });
    });
};

exports.getAllData = (req, res) => {
  modelPath
    .getAllData()
    .then((data) => {
      logger.info(`Fetched all comments: ${data.length} items`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error fetching all comments: ${err}`);
      res.status(500).send({ message: `Error in getAllData: ${err}` });
    });
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
      logger.info(`Updated comment with ID: ${Data.comment_id}`);
      res.send({ message: `Updated successfully for ID: ${Data.comment_id}` });
    })
    .catch((err) => {
      logger.error(
        `Error updating comment with ID ${Data.comment_id}: ${
          err.message || err
        }`
      );
      res.status(err.statusCode || 500).send(err);
    });
};

// Get a comment by ID
exports.getById = (req, res) => {
  const Id = parseInt(req.params.id);
  if (!Id) {
    logger.warn("Comment ID is required!");
    return res.status(400).send({ message: "Comment ID is required!" });
  }

  modelPath
    .getById(Id)
    .then((data) => {
      logger.info(`Fetched comment with ID: ${Id}`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error fetching comment with ID ${Id}: ${err}`);
      res.status(err.statusCode || 500).send(err);
    });
};

// Delete a comment by ID
exports.deleteById = (req, res) => {
  const Id = req.params.id;
  if (!Id) {
    logger.warn("Comment ID is required!");
    return res.status(400).send({ message: "Comment ID is required!" });
  }

  modelPath
    .deleteById(Id)
    .then(() => {
      logger.info(`Deleted comment with ID: ${Id}`);
      res.send({ message: `Deleted successfully with ID: ${Id}` });
    })
    .catch((err) => {
      logger.error(
        `Error deleting comment with ID ${Id}: ${err.message || err}`
      );
      res.status(err.statusCode || 500).send(err);
    });
};

// Delete all comments
exports.deleteAllData = (req, res) => {
  modelPath
    .deleteAllData()
    .then(() => {
      logger.info("All comments deleted successfully!");
      res.send({ message: "All comments deleted successfully!" });
    })
    .catch((err) => {
      logger.error(`Error deleting all comments: ${err.message || err}`);
      res.status(500).send({
        message: `Error in deleteAllData: ${err.message || err}`,
      });
    });
};

// Filter comments based on query parameters
exports.filterByData = (req, res) => {
  const queryParams = req.query;

  if (Object.keys(queryParams).length === 0) {
    logger.warn("No query parameters provided.");
    return res.status(400).send({ message: "No query parameters provided." });
  }
  const { keys, values, error } = validateQueryKeys(queryParams);

  if (error) {
    logger.warn(`Error in query keys: ${error}`);
    return res.status(400).send({ message: error });
  }

  modelPath
    .filterByData(keys, values)
    .then((data) => {
      logger.info(`Filtered comments: ${data.length} items found.`);
      res.send(data);
    })
    .catch((err) => {
      logger.error(`Error filtering data by ${keys}: ${err.message || err}`);
      res.status(err.statusCode || 500).send({
        message: `Error filtering data by ${keys}: ${err.message || err}`,
      });
    });
};
function validateQueryKeys(queryParams) {
  const allowedKeys = [
    "user_id",
    "project_id",
    "task_id",
    "content",
    "comment_id",
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
