const path = require("path");
const db = require(path.join(__dirname, "..", "config", "db.config.js"));
exports.runQuery = (query, values) => {
  return new Promise((resolve, reject) => {
    db.run(query, values, function (err) {
      if (err) {
        return reject({
          message: `Error during execution: ${err}`,
          statusCode: 500,
        });
      }
      if (this.changes === 0) {
        return reject({ message: "ID is not Found", statusCode: 404 });
      }
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
        return reject({
          message: `Error fetching data: ${err}`,
          statusCode: 500,
        });
      }
      resolve({ data: data, message: `Successfully fetched the data` });
    });
  });
};
exports.getQuery = (query, params) => {
  return new Promise((resolve, reject) => {
    db.get(query, params, function (err, data) {
      if (err) {
        return reject({
          message: `Error executing query: ${err}`,
          statusCode: 500,
        });
      }
      if (!data) {
        return reject({ message: "ID not found", statusCode: 404 });
      }
      resolve({ data: data, message: `Successfully fetched the data` });
    });
  });
};
