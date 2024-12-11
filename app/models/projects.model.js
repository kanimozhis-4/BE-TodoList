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
    SET name = ?, color = ?, is_favorite = ? 
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
exports.bulkInsertProjects = (projects) => {
  return new Promise((resolve, reject) => {
    const placeholders = projects
      .map(() => "(?, ?, ?)")  
      .join(", ");  
    
    const query = `
      INSERT INTO projects (name, color, is_favorite)
      VALUES ${placeholders};  
    `;
    
    // Flatten the project array to get values for the query
    const values = projects.flatMap((p) => [
      p.name,
      p.color,
      p.is_favorite,
    ]);

    // Execute the query using the db.runQuery method
    db.runQuery(query, values)
      // .then(() => {
      //   console.log(`${projects.length} projects inserted successfully.`);
      //   resolve();  // Resolve the promise when the insertion is successful
      // })
      // .catch((error) => {
      //   console.error('Error inserting projects in bulk:', error);
      //   reject(error);  // Reject the promise if an error occurs
      // });
  });
};
