const path = require("path");
const db = require(path.join(__dirname, "..", "models", "db.js"));

// Create a new comment
exports.createComment = (Data) => {
  const query = `INSERT INTO Comments (user_id, project_id, task_id, content) VALUES (?, ?, ?, ?)`;
  const values = Object.values(Data);
  return db.runQuery(query, values);
};

exports.getAllData = () => {
  const query = `SELECT * from comments`;
  return db.runAllQuery(query, []);
};

// Update a comment by ID
exports.updateById = (Data) => {
  const query = `
    UPDATE Comments 
    SET 
        content = ? 
    WHERE comment_id = ?;
  `;
  const values = Object.values(Data);
  return db.runQuery(query, values);
};

// Get a comment by ID
exports.getById = (Id) => {
  const query = `SELECT comment_id, user_id, project_id, task_id, content, posted_at FROM Comments WHERE comment_id = ?;`;
  return db.getQuery(query, [Id]);
};

// Delete a comment by ID
exports.deleteById = (Id) => {
  const query = `DELETE FROM Comments WHERE comment_id = ?`;
  return db.runQuery(query, [Id]);
};

// Delete all comments
exports.deleteAllData = () => {
  const query = `DELETE FROM Comments`;
  return db.runQuery(query, []);
};

// Filter comments by a specified key and value
exports.filterByData = (keys, values) => {

    const whereClause = keys.length ? `WHERE ${keys.join(" AND ")}` : "";
    const query = `SELECT comment_id, user_id, project_id, task_id, content, posted_at FROM Comments ${whereClause}`;

    return db.runAllQuery(query, values)
}; 

