const jwt = require('jsonwebtoken');
const verifyLogin = require('../helpers/verifyLogin');
const { User } = require('../models');

const create = async ({ email, password }) => {
  const SECRET = process.env.JWT_SECRET;
  const jwtConfig = { expiresIn: '1d' };

  const resultVerify = verifyLogin(email, password);

  if (resultVerify.err) return resultVerify;

  const user = await User.findOne({ where: { email } });

  if (!user || user.password !== password) return { err: 'Invalid fields', code: 400 };
  if (user.password !== password) return { err: 'Invalid fields', code: 400 };
  return jwt.sign({ data: { displayName: user.displayName, email } }, SECRET, jwtConfig);
};

module.exports = {
  create,
};