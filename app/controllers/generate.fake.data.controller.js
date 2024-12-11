const { faker } = require('@faker-js/faker');
const path = require("path");
const modelPath = require(path.join(__dirname, "..", "models", "projects.model.js"));

exports.generateFakeData = (req, res) => {
  const rows = parseInt(req.query.rows) || 1000000;  // Default to 1 million if not specified
  const batchSize = 1000;  // Adjust based on database capacity
  const fakeProjects = [];

  // Initialize a batch of promises
  const generateDataPromise = new Promise(async (resolve, reject) => {
    try {
      let batchInsertCount = 0;

      // Loop to generate fake data
      for (let i = 0; i < rows; i++) {
        fakeProjects.push({
          name: faker.commerce.productName(),
          color: faker.internet.color(),
          is_favorite: faker.datatype.boolean(),
        });

        // Bulk insert in batches
        if (fakeProjects.length === batchSize || i === rows - 1) {
          // Insert the current batch
          await modelPath.bulkInsertProjects(fakeProjects);
          batchInsertCount++;
          fakeProjects.length = 0;  // Clear array after insertion

          // Resolve when all batches are inserted
          if (batchInsertCount === Math.ceil(rows / batchSize)) {
            resolve();
          }
        }
      }
    } catch (error) {
      reject(`Error generating fake data: ${error.message || error}`);
    }
  });

  // Handling the promise result
  generateDataPromise
    .then(() => {
      res.status(201).send({
        message: `${rows} fake projects generated successfully.`,
      });
    })
    .catch((error) => {
      console.error("Error generating fake data:", error);
      res.status(500).send({
        message: `Error generating fake data: ${error}`,
      });
    });
};
