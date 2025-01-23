const Task = require("../models/tasks.model");
const logger = require("../utils/logger");

exports.createTask = async (taskData) => {
  try {
    const newTask = await Task.create(taskData);
    logger.info("Task created successfully:", newTask);
    return newTask;
  } catch (err) {
    logger.error("Error creating task:", err);
    throw new Error(`Error creating task: ${err.message}`);
  }
};
exports.getAllData = async (userId) => {
  try {
    const tasks = await Task.findAll({
      where: {
        user_id: userId,
      },
    });
    logger.info("Fetched all tasks for user:", tasks);
    return tasks;
  } catch (err) {
    logger.error("Error fetching tasks:", err);
    throw new Error(`Error fetching tasks: ${err.message}`);
  }
};
exports.getById = async (id) => {
  try {
    const task = await Task.findByPk(id);
    if (!task) {
      const error = new Error(`Task with ID ${id} not found`);
      error.statusCode = 404;
      throw error;
    }
    logger.info(`Fetched task with ID ${id}:`, task);
    return task;
  } catch (err) {
    logger.error(`Error fetching task with ID ${id}:`, err);
    throw new Error(`Error fetching task with ID ${id}: ${err.message}`);
  }
};
exports.updateById = async (data, id) => {
  try {
    const updatedRowsCount = await Task.update(data, {
      where: { task_id: id },
    });
    if (updatedRowsCount === 0) {
      const error = new Error(`Task with ID ${id} not found`);
      error.statusCode = 404;
      throw error;
    }
    const updatedTask = await Task.findByPk(id);
    logger.info(`Task with ID ${id} updated successfully:`, updatedTask);
    return updatedTask;
  } catch (err) {
    logger.error(`Error updating task with ID ${id}:`, err);
    throw new Error(`Error updating task: ${err.message}`);
  }
};
exports.deleteById = async (id) => {
  try {
    const result = await Task.destroy({
      where: { task_id: id },
    });

    if (result === 0) {
      const error = new Error(`Task with ID ${id} not found`);
      error.statusCode = 404;
      throw error;
    }

    logger.info(`Task with ID ${id} deleted successfully`);
    return { message: `Task with ID ${id} deleted successfully` };
  } catch (err) {
    logger.error(`Error deleting task with ID ${id}:`, err);
    throw new Error(`Error deleting task: ${err.message}`);
  }
};
