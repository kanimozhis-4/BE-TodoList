const sqlite3 = require("sqlite3").verbose();
const faker = require("faker");
const db = require(`./db.config`); // Ensure db.config is correctly exporting a sqlite3 database instance

const generateUsers = async () => {
  console.time("User Insertion Time");

  db.serialize(() => {
    // Start a transaction
    db.run("BEGIN TRANSACTION;", (err) => {
      if (err) console.error("Failed to begin transaction: ", err.message);
    });

    const insertBatch = (batch) => {
      return new Promise((resolve, reject) => {
        db.run(
          `INSERT INTO users (name, email) VALUES ${batch.join(",")}`,
          (err) => {
            if (err) reject(err);
            else resolve();
          }
        );
      });
    };

    const BATCH_SIZE = 1000; // Insert in batches of 1,000
    const totalUsers = 10000;
    let batch = [];

    const insertUsers = async () => {
      for (let i = 1; i <= totalUsers; i++) {
        let name, email;
        do {
          name = faker.internet.userName().replace(/'/g, "''");
          email = faker.internet.email().replace(/'/g, "''");
        } while (await isEmailExists(email)); // Regenerate if email exists

        // Push a single row using backticks for interpolation
        batch.push(`('${name}', '${email}')`);

        // Execute batch insert
        if (i % BATCH_SIZE === 0 || i === totalUsers) {
          try {
            await insertBatch(batch);
            batch = []; // Clear the batch
          } catch (err) {
            console.error(`Failed to insert batch: ${err.message}`);
          }
        }
      }
    };

    const isEmailExists = (email) => {
      return new Promise((resolve, reject) => {
        db.get("SELECT 1 FROM users WHERE email = ?", [email], (err, row) => {
          if (err) reject(err);
          resolve(row ? true : false);
        });
      });
    };

    insertUsers()
      .then(() => {
        db.run("COMMIT;", (err) => {
          if (err) console.error("Failed to commit transaction: ", err.message);
          console.log("All users inserted successfully.");
          console.timeEnd("User Insertion Time");
          db.close((err) => {
            if (err) console.error("Failed to close database: ", err.message);
          });
        });
      })
      .catch((err) => {
        console.error("Error during user data insertion: ", err.message);
        db.run("ROLLBACK;", () => db.close());
      });
  });
};

generateUsers();
