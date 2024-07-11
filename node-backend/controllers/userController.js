const { User } = require('../models');

const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ detail: "Email already registered" });
    }
    const user = await User.create({ name, email });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUsers = async (req, res) => {
  const { skip = 0, limit = 100 } = req.query;
  const users = await User.findAll({ offset: parseInt(skip), limit: parseInt(limit) });
  res.json(users);
};

const getUserById = async (req, res) => {
  const user = await User.findByPk(req.params.userId);
  if (!user) {
    return res.status(404).json({ detail: "User not found" });
  }
  res.json(user);
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
};
