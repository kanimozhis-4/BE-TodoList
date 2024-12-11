const express = require('express');
const router = express.Router();
const path = require('path');

// Import the users controller
const controller = require(path.join(__dirname, '..', 'controllers', 'users.controller.js'));

// Create a new user
router.post('/', controller.createUser);

// Update user by ID
router.put('/:id', controller.updateById);

// Filter users by specific criteria
router.get('/filter', controller.filterByData);

// Get a single user by ID
router.get('/:id', controller.getById);

// Delete a user by ID
router.delete('/delete/:id', controller.deleteById);

// Delete all users
router.delete('/', controller.deleteAllData);

module.exports = router;
