const express = require('express');
const router = express.Router();
const path = require('path');

// Import the comments controller
const controller = require(path.join(__dirname, '..', 'controllers', 'comments.controller.js'));

// Create a new comment
router.post('/', controller.createComment);

// Update a comment by ID
router.put('/:id', controller.updateById);

// Filter comments by specific criteria
router.get('/filter', controller.filterByData);

// Get a single comment by ID
router.get('/:id', controller.getById);

// Delete a comment by ID
router.delete('/delete/:id', controller.deleteById);

// Delete all comments
router.delete('/', controller.deleteAllData);

module.exports = router;
