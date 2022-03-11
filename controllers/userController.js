const { User } = require('../models');
const userService = require('../services/userService');

const create = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const response = await userService
  .create({ displayName, email, password, image });

  if (response.err) return res.status(response.code).json({ message: response.err });

  return res.status(201).json({ token: response });
};

const findAll = async (_req, res) => {
  const users = await User.findAll();

  res.status(200).json(users);
};

const findById = (_req, _res) => {};

const update = (_req, _res) => {};

module.exports = {
  create,
  findAll,
  findById,
  update,
};