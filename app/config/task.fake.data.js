const sqlite3 = require('sqlite3').verbose();
const faker = require('faker');
const db = require(`./db.config`); // Ensure db.config is correctly exporting a sqlite3 database instance

const generateTasks = async () => {
  console.time("Task Insertion Time");

  db.serialize(() => {
    // Start a transaction
    db.run("BEGIN TRANSACTION;", (err) => {
      if (err) console.error("Failed to begin transaction: ", err.message);
    });

    const insertBatch = (batch) => {
      return new Promise((resolve, reject) => {
        db.run(
          `INSERT INTO tasks (content, description, due_date, is_completed, project_id, user_id) VALUES ${batch.join(",")}`,
          (err) => {
            if (err) reject(err);
            else resolve();
          }
        );
      });
    };

    const BATCH_SIZE = 1000; // Insert in batches of 1,000
    const totalTasks = 10000000; // Total tasks to create

    const insertTasks = async () => {
      let batch = [];
      for (let i = 1; i <= totalTasks; i++) {
        const content = faker.lorem.sentence().replace(/'/g, "''");
        const description = faker.lorem.paragraph().replace(/'/g, "''");
        const dueDate = faker.date.future().toISOString().split('T')[0]; // Get date in YYYY-MM-DD format
        const isCompleted = Math.random() < 0.5 ? 1 : 0; // Random completed status (0 or 1)
        const projectId = Math.floor(Math.random() * 1000000) + 1; // Random project_id between 1 and 1 million
        const userId = Math.floor(Math.random() * 10000) + 1; // Random user_id between 1 and 10,000

        batch.push(`('${content}', '${description}', '${dueDate}', ${isCompleted}, ${projectId}, ${userId})`);

        // Execute batch insert
        if (i % BATCH_SIZE === 0 || i === totalTasks) {
          try {
            await insertBatch(batch);
            batch = []; // Clear the batch after each insertion
          } catch (err) {
            console.error(`Failed to insert tasks batch: ${err.message}`);
          }
        }
      }
    };

    // Run the insertion function for tasks
    insertTasks()
      .then(() => {
        db.run("COMMIT;", (err) => {
          if (err) console.error("Failed to commit transaction: ", err.message);
          console.log("All tasks inserted successfully.");
          console.timeEnd("Task Insertion Time");
          db.close((err) => {
            if (err) console.error("Failed to close database: ", err.message);
          });
        });
      })
      .catch((err) => {
        console.error("Error during task data insertion: ", err.message);
        db.run("ROLLBACK;", () => db.close());
      });
  });
};

generateTasks();
