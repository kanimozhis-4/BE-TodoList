const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./connect.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else { 

        console.log('Connected to the SQLite database.');
        db.run("PRAGMA foreign_keys = ON;", (err) => {
          if (err) {
              console.error("Error enabling foreign keys:", err.message);
          } 
      });
    }
});

// Function to create the 'projects' and 'tasks' tables
const createTables = () => {
  const userQuery=`CREATE TABLE IF NOT EXISTS Users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
  );` 
  
    const projectQuery = `
     CREATE TABLE IF NOT EXISTS projects (
        project_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        color TEXT NOT NULL,
        is_favorite BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
     
    `;
  
    const taskQuery = `
      CREATE TABLE IF NOT EXISTS Tasks (
      task_id SERIAL PRIMARY KEY,           
      content TEXT NOT NULL,                  
      description TEXT,                       
      due_date DATE,                         
      is_completed BOOLEAN DEFAULT FALSE, 
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      project_id INT NOT NULL,               
      user_id INT NOT NULL,                  
      FOREIGN KEY (project_id) REFERENCES Projects(project_id) 
        ON DELETE CASCADE ON UPDATE CASCADE,  
      FOREIGN KEY (user_id) REFERENCES Users(user_id) 
        ON DELETE CASCADE ON UPDATE CASCADE   
    );`; 
    
    const commentsQuery=`CREATE TABLE IF NOT EXISTS Comments (
      comment_id SERIAL PRIMARY KEY,
      user_id INT NOT NULL,
      project_id INT NOT NULL,   -- Project ID is always required
      task_id INT,               -- Task ID is nullable
      content TEXT NOT NULL,
      posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
      FOREIGN KEY (project_id) REFERENCES Projects(project_id) ON DELETE CASCADE,
      FOREIGN KEY (task_id) REFERENCES Tasks(task_id) ON DELETE CASCADE
    );`
  
    db.run(userQuery, (err) => {
      if (err) {
        console.error('Error creating User table:', err.message);
      } else {
        console.log('User table created or already exists.');
      }
    });

    db.run(projectQuery, (err) => {
      if (err) {
        console.error('Error creating projects table:', err.message);
      } else {
        console.log('Projects table created or already exists.');
      }
    });

    db.run(taskQuery, (err) => {
      if (err) {
        console.error('Error creating tasks table:', err.message);
      } else {
        console.log('tasks table created or already exists.');
      }
    });
  
    db.run(commentsQuery, (err) => {
      if (err) {
        console.error('Error creating comments table:', err.message);
      } else {
        console.log('Comments table created or already exists.');
      }
    });
  };
  
  // Call the createTables function
  createTables();
  
  // Export the db connection for use in other modules
  module.exports = db;