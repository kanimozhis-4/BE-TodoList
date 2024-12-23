const path = require("path");
const db = require(path.join(__dirname, "..", "models", "db.js"));

exports.createTask = (Data) => {
  const query = `INSERT INTO tasks (content, description, due_date, is_completed, user_id,project_id) 
                 VALUES (?, ?, ?, ?, ?,?)`;
  const values = Object.values(Data);

  return db.runQuery(query, values);
};

exports.getAllData = () => {
  const query = `SELECT task_id,content,description,due_date,is_completed
  created_at,project_id,user_id FROM tasks`;
  return db.runAllQuery(query, []);
};

exports.updateById = (Data) => {
  const query = `  
      UPDATE tasks 
      SET 
          content = ?, 
          description = ?, 
          due_date = ?, 
          is_completed = ?, 
          project_id = ? ,
          user_id=?
      WHERE id = ?;
    `;
  const values = Object.values(Data);

  return db.runQuery(query, values);
};

exports.getById = (Id) => {
  const query = `SELECT * FROM tasks WHERE id = ?;`;
  return db.getQuery(query, [Id]);
};

exports.deleteById = (Id) => {
  const query = `DELETE FROM tasks WHERE id = ?`;
  return db.runQuery(query, [Id]);
};

exports.deleteAllData = () => {
  const query = `Delete from tasks`;
  return db.runQuery(query, []);
};

exports.filterByData = (key, value) => {
  const query = `SELECT * FROM tasks WHERE ${key} = ?`;
  return db.runAllQuery(query, [value]);
};
