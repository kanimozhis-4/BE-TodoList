const Project = require("../models/projects.model");
const logger = require("../utils/logger");
exports.createProject = async (data) => {
  try {
    const project = await Project.create(data);
    logger.info("Project created successfully", project);
    return project;
  } catch (error) {
    logger.error("Error creating project:", error);
    throw error;
  }
};

exports.getAllData = async (userId) => {
  try {
    const projects = await Project.findAll({
      where: { user_id: userId },
    });
    logger.info(`Fetched all projects for user ID: ${userId}`, projects);
    return projects;
  } catch (error) {
    logger.error("Error fetching all projects:", error);
    throw error;
  }
};
exports.getById = async (id) => {
  try {
    const project = await Project.findByPk(id);
    if (!project) {
      const error = new Error(`Project with ID ${id} not found`);
      error.statusCode = 404;
      throw error;
    }
    logger.info(`Fetched project with ID: ${id}`, project);
    return project;
  } catch (err) {
    logger.error(`Error fetching project with ID: ${id}`, err);
    throw new Error(`Error fetching project: ${err.message}`);
  }
};
exports.deleteById = async (id) => {
  try {
    const result = await Project.destroy({
      where: { project_id: id },
    });

    if (result === 0) {
      const error = new Error(`Project with ID ${id} not found`);
      error.statusCode = 404;
      throw error;
    }

    logger.info(`Project with ID ${id} deleted successfully`);
    return { message: `Project with ID ${id} deleted successfully` };
  } catch (err) {
    logger.error(`Error deleting project with ID: ${id}`, err);
    throw new Error(`Error deleting project: ${err.message}`);
  }
};
exports.updateById = async (data, id) => {
  try {
    const updatedRowsCount = await Project.update(data, {
      where: { project_id: id },
    });

    if (updatedRowsCount[0] === 0) {
      const error = new Error(`Project with ID ${id} not found`);
      error.statusCode = 404;
      throw error;
    }

    const updatedProject = await Project.findByPk(id);
    logger.info(`Project with ID ${id} updated successfully`, updatedProject);
    return updatedProject;
  } catch (err) {
    logger.error(`Error updating project with ID: ${id}`, err);
    throw new Error(`Error updating project: ${err.message}`);
  }
};
