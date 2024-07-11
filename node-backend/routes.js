const express = require('express');
const { createUser, getUsers, getUserById } = require('./controllers/userController');
const { createTodo, getTodos } = require('./controllers/todoController');

const router = express.Router();

// User Routes
router.post('/users', createUser);
router.get('/users', getUsers);
router.get('/users/:userId', getUserById);
router.post('/users/:userId/todos', createTodo);

// Todo Routes
router.get('/todos', getTodos);

module.exports = router;
