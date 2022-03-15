const { User } = require('../models');
const userService = require('../services/userService');

const create = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const { err, code, token } = await userService
  .create({ displayName, email, password, image });

  if (err) return res.status(code).json({ message: err });

  return res.status(code).json({ token });
};

const findAll = async (_req, res) => {
  const users = await User.findAll();

  res.status(200).json(users);
};

const findById = async (req, res) => {
  const { id } = req.params;

  const { user, err, code } = await userService.findById({ id });

  if (err) return res.status(code).json({ message: err });
  
  return res.status(code).json(user);
};

const destroy = async (req, res) => {
  const { user } = req;

  const { code } = await userService.destroy(user);

  return res.status(code).end();
};

module.exports = {
  create,
  findAll,
  findById,
  destroy,
};