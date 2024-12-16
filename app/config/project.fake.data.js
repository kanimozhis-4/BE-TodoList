const sqlite3 = require('sqlite3').verbose();
const faker = require('faker');
const db = require(`./db.config`); // Ensure db.config is correctly exporting a sqlite3 database instance

const generateProjects = async () => {
  console.time("Project Insertion Time");

  db.serialize(() => {
    
    // Start a transaction
    db.run("BEGIN TRANSACTION;", (err) => {
      if (err) console.error("Failed to begin transaction: ", err.message);
    });

    const insertBatch = (batch) => {
      return new Promise((resolve, reject) => {
        db.run(
          `INSERT INTO projects (name, color, is_favorite, user_id) VALUES ${batch.join(",")}`,
          (err) => {
            if (err) reject(err);
            else resolve();
          }
        );
      });
    };

    const BATCH_SIZE = 1000; // Insert in batches of 1,000
    const totalProjects = 1000000; // Total projects to create

    const insertProjects = async () => {
      let batch = [];
      for (let i = 1; i <= totalProjects; i++) {
        const projectName = faker.commerce.productName().replace(/'/g, "''");
        const projectColor = faker.commerce.color().replace(/'/g, "''");
        const userId = Math.floor(Math.random() * 10000) + 1; // Random user_id between 1 and 10000

        batch.push(`('${projectName}', '${projectColor}', ${Math.random() < 0.5 ? 1 : 0}, ${userId})`);

        if (i % BATCH_SIZE === 0 || i === totalProjects) {
          try {
            await insertBatch(batch);
            batch = []; // Clear the batch
          } catch (err) {
            console.error(`Failed to insert projects batch: ${err.message}`);
          }
        }
      }
    };

    // Run the insertion function for projects
    insertProjects()
      .then(() => {
        db.run("COMMIT;", (err) => {
          if (err) console.error("Failed to commit transaction: ", err.message);
          console.log("All projects inserted successfully.");
          console.timeEnd("Project Insertion Time");
          db.close((err) => {
            if (err) console.error("Failed to close database: ", err.message);
          });
        });
      })
      .catch((err) => {
        console.error("Error during project data insertion: ", err.message);
        db.run("ROLLBACK;", () => db.close());
      });
  });
};

generateProjects();
