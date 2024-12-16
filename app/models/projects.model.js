const path = require("path");
const db = require(path.join(__dirname, "..", "models", "db.js"));

exports.createProject = (Data) => {
  const query = `INSERT INTO projects (name, color, is_favorite) VALUES (?, ?, ?)`;
  const values = Object.values(Data);
  return db.runQuery(query, values);
};

exports.getAllData = () => {
  const query = `SELECT * FROM projects`;
  return db.runAllQuery(query, []);
};

exports.updateById = (Data) => {
  const query = `
    UPDATE projects 
    SET name = ?, color = ?, is_favorite = ? ,user_id=?
    WHERE project_id = ?;
  `;
  const values = Object.values(Data);
  return db.runQuery(query, values);
};

exports.getById = (Id) => {
  const query = `SELECT * FROM projects WHERE project_id = ?`;
  return db.getQuery(query, [Id]);
};

exports.deleteById = (Id) => {
  const query = `DELETE FROM projects WHERE project_id = ?`;
  return db.runQuery(query, [Id]);
};

exports.deleteAllData = () => {
  const query = `DELETE FROM projects`;
  return db.runQuery(query, []);
};
exports.filterByData = (key, value) => {
  const query = `SELECT * FROM projects WHERE ${key} = ?`;
  return db.runAllQuery(query, [value]);
};
