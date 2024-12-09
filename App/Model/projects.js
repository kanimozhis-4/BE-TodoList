const path=require('path')
const db=require(path.join(__dirname,'..','Config','DBConfig.js'))
exports.createProject = (Data, result) => {
    const query=`INSERT INTO projects (name, color, is_favorite) VALUES (?, ?, ?)`;
    const values =Object.values(Data);
    db.run(query, values, (err) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created the project",this.lastID);
    //   console.log("created tutorial: ", { id: res.insertId, ...newTutorial });
      result(null, "project is created");
    });
};  
exports.getAllData=(result)=>{  
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
    // const query=`DROP TABLE IF EXISTS projects;`;

    db.all(query, [], (err, data) => {
        if (err) {
            console.error("Error fetching data:", err);
            result(err, null);  // Return error
            return;
        }
        result(null, data);  // Return fetched data
    });
}  
exports.updateById= (Data, result) => { 
    const query = `  UPDATE projects 
        SET name = ?, 
            color = ?, 
            is_favorite = ? 
        WHERE project_id = ?;
    `;
    const values =Object.values(Data);
    db.run(query,values,(err)=> {
        if (err) {
          console.error("Error: ", err);
          result(err, null);
          return;
        }
        this.changes === 0
          ? result({ kind: "not_found" }, null)
          : result(null,`Updated, ${this.lastID}`);
      }
    );


}
exports.getById=(Id,result)=>{  
    const query = `
        SELECT * from projects where project_id=?;`;
    // const query=`DROP TABLE IF EXISTS projects;`;

    db.get(query, [Id], (err,data) => {
        if (err) {
            console.error("Error fetching data:", err);
            result(err, null);  // Return error
            return;
        }
        result(null, data);  // Return fetched data
    });
}   
exports.deleteById=(Id,result)=>{  
    const query = `
        DELETE FROM projects WHERE project_id = ?`;
    // const query=`DROP TABLE IF EXISTS projects;`;

    db.run(query, [Id], (err,data) => {
        if (err) {
            console.error("Error by deleteing data:", err);
            result(err, null);  // Return error
            return;
        }
        if (this.changes === 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, { message: "Task deleted successfully!" });
    });
}   
exports.deleteAllData=(Id,result)=>{  
    const query=`DROP TABLE IF EXISTS projects;`;

    db.run(query, [], (err,data) => {
        if (err) {
            console.error("Error by deleting data:", err);
            result(err, null);  // Return error
            return;
        }
        if (this.changes === 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, { message: "Task deleted successfully!" });
    });
}  