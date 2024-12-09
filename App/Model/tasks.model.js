const path = require("path");
const db = require(path.join(__dirname, "..", "Config", "DBConfig.js"));
exports.createTask = (Data, result) => {
  const query = `INSERT INTO tasks (content, description, due_date, is_completed, project_id) 
                   VALUES (?, ?, ?, ?, ?)`;
  const values = Object.values(Data);
  db.run(query, values,  function (err) {
    if (err) {
      result(err, null);
      return;
    } 
    // console.log("Inserted row ID:", this);
    result(null, `Task is created with ID: ${this.lastID}`);
  });
};
exports.updateById = (Data, result) => {
  const query = `  UPDATE tasks 
        SET 
            content = ?, 
            description = ?, 
            due_date = ?, 
            is_completed = ?, 
            project_id = ? 
        WHERE id = ?;
    `;
  const values = Object.values(Data);
  db.run(query, values,  function (err) {
    if (err) {
      result(err, null);
      return;
    }
    if (this.changes === 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    result(null, { message: "Updated successfully!" });
  });
};
exports.getById = (Id, result) => {
  const query = `
        SELECT * from tasks where id=?;`;

  db.get(query, [Id],  function (err,data) {
    if (err) {
      result(err, null); 
      return;
    }
    result(null, data); 
  });
};
exports.deleteById = (Id, result) => {
  const query = `
        DELETE FROM tasks WHERE id = ?`;

  db.run(query, [Id],  function (err) {
    if (err) {
      result(err, null); 
      return;
    }
    if (this.changes === 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    result(null, { message: "Task deleted successfully!" });
  });
};
exports.deleteAllData = (result) => {
  const query = `DROP TABLE IF EXISTS tasks;`;

  db.run(query, [], function (err) {
    if (err) {
      result(err, null); 
      return;
    }
    result(null, { message: "Task table deleted successfully!" });
  });
};
