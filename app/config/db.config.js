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
    const projectQuery = `
      CREATE TABLE IF NOT EXISTS projects (
        project_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        color TEXT NOT NULL,
        is_favorite BOOLEAN DEFAULT FALSE
      );
    `;
  
    const taskQuery = `
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT NOT NULL,
        description TEXT,
        due_date TEXT,
        is_completed BOOLEAN DEFAULT FALSE,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        project_id INTEGER,
        FOREIGN KEY (project_id) REFERENCES projects(project_id) 
        ON DELETE CASCADE ON UPDATE CASCADE
      );
    `;
  
    // Run the SQL queries to create the tables
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
        console.log('Tasks table created or already exists.');
      }
    });
  };
  
  // Call the createTables function
  createTables();
  
  // Export the db connection for use in other modules
  module.exports = db;