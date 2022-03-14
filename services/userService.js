const { User } = require('../models');
const verifyUser = require('../helpers/verifyUser');
const tokenGenerate = require('../helpers/tokenGenerate');

const create = async ({ displayName, email, password, image }) => {
  const resultVerify = verifyUser(displayName, email, password);

  if (resultVerify.err) return resultVerify;

  const user = await User.findOne({ where: { email } });

  if (user) return { err: 'User already registered', code: 409 };

  await User.create({ displayName, email, password, image });

  return tokenGenerate(displayName, email);
};

const findAll = () => {};

const findById = async ({ id }) => {
  const user = await User.findByPk(id);

  if (!user) return { err: 'User does not exist', code: 404 };

  return user;
};

const update = () => {};

const destroy = async (user) => {
  await User.destroy({
    where: { id: user.id },
  });
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  destroy,
};