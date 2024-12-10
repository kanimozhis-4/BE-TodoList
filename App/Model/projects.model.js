const path = require("path");
const db = require(path.join(__dirname, "..", "Config", "DBConfig.js"));
exports.createProject = (Data, result) => {
  const query = `INSERT INTO projects (name, color, is_favorite) VALUES (?, ?, ?)`;
  const values = Object.values(Data);
  db.run(query, values, function (err) {
    if (err) {
      result(`Error during project creation: ${err}`, null);
      return;
    }
    result(null, `Project created with ID: ${this.lastID}`);
  });
};
exports.getAllData = (result) => {
  const query = `
        SELECT 
        p.project_id AS project_id, 
        p.name AS project_name, 
        p.color, 
        p.is_favorite, 
        t.id AS task_id, 
        t.content, 
        t.description, 
        t.due_date, 
        t.is_completed, 
        t.created_at 
    FROM projects p
    LEFT JOIN tasks t ON p.project_id = t.project_id`; 
  // const query=`select * from projects,tasks`

  db.all(query, [], (err, data) => {
    if (err) {
      result(`Error fetching all data: ${err}`, null);
      return;
    }
    result(null, data);
  });
};
exports.updateById = (Data, result) => {
  const query = `  UPDATE projects 
        SET name = ?, 
            color = ?, 
            is_favorite = ? 
        WHERE project_id = ?;
    `;
  const values = Object.values(Data);
  db.run(query, values, function (err) {
    if (err) {
      result(`Error during project update: ${err}`, null);
      return;
    }
    if (this.changes === 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    result(null, `Project with ID ${this.changes} updated successfully!`);
  });
};
exports.getById = (Id, result) => {
  const query = `
        SELECT * from projects where project_id=?;`;
  db.get(query, [Id], (err, data) => {
    if (err) {
      result(`Error fetching project by ID: ${err}`, null);
      return;
    }
    result(null, data);
  });
};
exports.deleteById = (Id, result) => {
  const query = `
        DELETE FROM projects WHERE project_id = ?`;
  db.run(query, [Id], function (err) {
    if (err) {
      result(`Error during project deletion: ${err}`, null);
      return;
    }
    if (this.changes === 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    result(null, { message: `Project with ID ${Id} deleted successfully!` });
  });
};
exports.deleteAllData = (result) => {
  const query = `DROP TABLE IF EXISTS projects`;

  db.run(query, [], function (err) {
    if (err) {
      console.error("Error dropping project table:", err);
      result(err, null);
      return;
    }
    result(null, { message: "Project table dropped successfully!" });
  });
};
