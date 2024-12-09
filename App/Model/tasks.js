const path=require('path')
const db=require(path.join(__dirname,'..','Config','DBConfig.js'))
  exports.createTask = (Data, result) => {
    const query=`INSERT INTO tasks (content, description, due_date, is_completed, project_id) 
                   VALUES (?, ?, ?, ?, ?)`;
    const values =Object.values(Data);
    db.run(query, values, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created the task",res);
    //   console.log("created tutorial: ", { id: res.insertId, ...newTutorial });
      result(null, "task is created");
    });
  }; 
  exports.updateById= (Data, result) => { 
    const query = `  UPDATE tasks 
        SET 
            content = ?, 
            description = ?, 
            due_date = ?, 
            is_completed = ?, 
            project_id = ? 
        WHERE id = ?;
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
          : result(null,`Updated changes: , ${this.changes}`);
      }
    );


} 
exports.getById=(Id,result)=>{  
    const query = `
        SELECT * from tasks where id=?;`;
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
        DELETE FROM tasks WHERE id = ?`;
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
    const query=`DROP TABLE IF EXISTS tasks;`;

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