const { User } = require('../models');
const verifyLogin = require('../helpers/verifyLogin');
const tokenGenerate = require('../helpers/tokenGenerate');

const create = async ({ email, password }) => {
  const resultVerify = verifyLogin(email, password);

  if (resultVerify.err) return resultVerify;

  const user = await User.findOne({ where: { email } });

  if (!user || user.password !== password) return { err: 'Invalid fields', code: 400 };

  return tokenGenerate(user.displayName, email);
};

module.exports = {
  create,
};