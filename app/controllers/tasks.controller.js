const path = require("path");
const servicePath = require(path.join(
  __dirname,
  "..",
  "services",
  "tasks.service.js"
));
const logger = require(path.join(__dirname, "..", "utils", "logger.js"));
// Create a new task
exports.createTask = (req, res) => {
  const Data = {
    content: req.body.content,
    description: req.body?.description|| null,
    due_date: req.body?.due_date|| null,
    is_completed: req.body.is_completed || false,
    user_id: req.user.id,
    project_id: req.body.project_id,
  }; 

  servicePath
    .createTask(Data)
    .then((data) => {
      logger.info("Task created successfully:", data);
      res.status(201).send({
        message: `Task created successfully in the Id: ${data.task_id}`,
        id: data.task_id,
        data: data,
      });
    })
    .catch((err) => {
      logger.error("Error creating task:", err.message || err);
      res.status(500).send({
        message: `Error in createTask: ${err.message || err}`,
      });
    });
};

exports.getAllData = (req, res) => {
  const userId = req.user.id; 
  servicePath
    .getAllData(userId)
    .then((data) => {
      logger.info("Fetched all tasks:", data);
      res.send({
        message: `Fetched all tasks`,
        data: data,
      });
    })
    .catch((err) => {
      logger.error("Error getting all tasks:", err);
      res.status(500).send({ message: `Error in getAllData: ${err}` });
    });
};

// Update a task by ID
exports.updateById = (req, res) => {
  const Data = {
    content: req.body.content,
    description: req.body.description|| null,
    due_date: req.body.due_date || null,
    is_completed: req.body.is_completed || false,
    project_id: req.body.project_id,
    user_id: req.user.id,
  };  
  const id=req.params.id

  servicePath
    .updateById(Data,id)
    .then((data) => {
      logger.info(`Task with ID: ${data.task_id} updated successfully`);
      res.send({
        message: `updated successfully in the Id: ${data.task_id}`,
        id:data.task_id,
        data: data,
      });
    })
    .catch((err) => {
      logger.error(`Error updating task with ID: ${Data.id}`, err);
      res.status(err.statusCode || 500).send({
        message: err.message || 'An error occurred while updating the task.',
      });
    });
};

// Get a task by ID
exports.getById = (req, res) => {
  const Id = req.params.id;
  if (!Id) {
    logger.warn("User ID is required!");
    return res.status(400).send({
      message: "ID is required!",
    });
  }

  servicePath
    .getById(Id)
    .then((data) => {
      logger.info(`Fetched task with ID: ${Id}`, data);
      res.send({
        message: `Fetched task with ID: ${data.task_id}`,
        id: data.task_id,
        data: data,
      });
    })
    .catch((err) => {
      logger.error(`Error getting task with ID: ${Id}`, err);
      res.status(err.statusCode || 500).send({
        message: err.message || 'An error occurred while getting the task.',
      });
    });
};

// Delete a task by ID
exports.deleteById = (req, res) => {
  const Id = req.params.id;
  if (!Id) {
    logger.warn("User ID is required!");
    return res.status(400).send({
      message: "ID is required!",
    });
  }

  servicePath
    .deleteById(Id)
    .then(() => {
      logger.info(`Task with ID: ${Id} deleted successfully`);
      res.send({ message: `deleted the successfully with ID :${Id}`, id: Id });
    })
    .catch((err) => {
      logger.error(`Error deleting task with ID: ${Id}`, err);
      res.status(err.statusCode || 500).send({
        message: err.message || 'An error occurred while deleting the task.',
      });
    });
};

