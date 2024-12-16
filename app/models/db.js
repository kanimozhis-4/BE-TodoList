const path = require("path");
const db = require(path.join(__dirname, "..", "config", "db.config.js"));
const logger = require(path.join(__dirname, "..", "utils", "logger.js"));
exports.runQuery = (query, values) => {
  return new Promise((resolve, reject) => {
    db.run(query, values, function (err) {
      if (err) {
        logger.error(`Query Execution Error: ${err} | Query: ${query}`);
        return reject({
          message: `Error during execution: ${err}`,
          statusCode: 500,
        });
      }
      if (this.changes === 0) {
        logger.warn(`No records updated | Query: ${query}`);
        return reject({ message: "ID is not Found", statusCode: 404 });
      }
      logger.info(`Query successful | ID: ${this.lastID} | Query: ${query}`);
      return resolve({
        data: { ID: this.lastID },
        message: `Operation successful with ID: ${this.lastID}`,
      });
    });
  });
};
exports.runAllQuery = (query, params) => {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, data) => {
      if (err) {
        logger.error(`Data Fetch Error: ${err} | Query: ${query}`);
        return reject({
          message: `Error fetching data: ${err}`,
          statusCode: 500,
        });
      }
      logger.info(`Data fetched successfully | Query: ${query}`);
      resolve({ data: data, message: `Successfully fetched the data` });
    });
  });
};
exports.getQuery = (query, params) => {
  return new Promise((resolve, reject) => {
    db.get(query, params, function (err, data) {
      if (err) {
        logger.error(`Query Execution Error: ${err} | Query: ${query}`);
        return reject({
          message: `Error executing query: ${err}`,
          statusCode: 500,
        });
      }
      if (!data) {
        logger.warn(`ID not found | Query: ${query}`);
        return reject({ message: "ID not found", statusCode: 404 });
      }
      logger.info(`Query successful | Data: ${JSON.stringify(data)} | Query: ${query}`);
      resolve({ data: data, message: `Successfully fetched the data` });
    });
  });
};
