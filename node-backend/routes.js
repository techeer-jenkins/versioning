const express = require('express');
const { createUser, getUsers, getUserById } = require('./controllers/userController');
const { createTodo, getTodos } = require('./controllers/todoController');

const router = express.Router();

// User Routes
router.post('/api/v2/users', createUser);
router.get('/api/v2/users', getUsers);
router.get('/api/v2/users/:userId', getUserById);
router.post('/api/v2/users/:userId/todos', createTodo);

// Todo Routes
router.get('/api/v2/todos', getTodos);

module.exports = router;
