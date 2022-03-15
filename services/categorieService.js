const { Categorie } = require('../models');

const create = async ({ name }) => {
  if (!name) return { err: '"name" is required', code: '400' };

  const created = await Categorie.create({ name });

  return { created, code: 201 };
};

module.exports = {
  create,
};