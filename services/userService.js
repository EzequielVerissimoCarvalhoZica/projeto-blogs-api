const jwt = require('jsonwebtoken');
const { User } = require('../models');
const verifyUser = require('../helpers/verifyUser');

const create = async ({ displayName, email, password, image }) => {
  const SECRET = process.env.JWT_SECRET;
  const jwtConfig = { expiresIn: '1d' };

  const resultUser = verifyUser.verifyUser(displayName, email, password);
  if (resultUser.err) return resultUser;

  const user = await User.findOne({ where: { email } });

  if (user) return { err: 'User already registered', code: 409 };

  await User.create({ displayName, email, password, image });

  return jwt.sign({ data: { displayName, email } }, SECRET, jwtConfig);
};

const findAll = () => {};

const findById = () => {};

const update = () => {};

module.exports = {
  create,
  findAll,
  findById,
  update,
};