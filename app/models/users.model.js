const path = require("path");
const db = require(path.join(__dirname, "..", "models", "db.js"));

// Create a new user
exports.createUser = (Data) => {
  const query = `INSERT INTO users (name, email) VALUES (?, ?)`;
  const values = Object.values(Data);
  return db.runQuery(query, values);
};

// Update a user by ID
exports.updateById = (Data) => {
  const query = `
    UPDATE users 
    SET 
        name = ?, 
        email = ? 
    WHERE user_id = ?;
  `;
  const values = Object.values(Data);
  return db.runQuery(query, values);
};

// Get a user by ID
exports.getById = (Id) => {
  const query = `SELECT user_id ,name, email FROM users WHERE user_id = ?;`;
  return db.getQuery(query, [Id]);
};

// Delete a user by ID
exports.deleteById = (Id) => {
  const query = `DELETE FROM users WHERE user_id = ?`;
  return db.runQuery(query, [Id]);
};

// Delete all users
exports.deleteAllData = () => {
  const query = `DELETE FROM users`;
  return db.runQuery(query, []);
};

// Filter users by specified key and value
exports.filterByData = (key, value) => {
  const allowedKeys = ["name", "email"];

  if (!allowedKeys.includes(key)) {
    return Promise.reject(
      new Error(`Invalid filter key. Allowed keys: ${allowedKeys.join(", ")}`)
    );
  }

  const query = `SELECT user_id ,name , email FROM users WHERE ${key} = ?`;
  return db.runAllQuery(query, [value]);
};
