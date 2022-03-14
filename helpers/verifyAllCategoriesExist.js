const { Categorie } = require('../models');

module.exports = async (categoryIds) => {
  const categories = await Categorie.findAll();

  const ids = categories.map(({ id }) => id);

  const allCategoriesExist = categoryIds.every((c) => ids.includes(c));

  if (!allCategoriesExist) return { err: '"categoryIds" not found', code: 400 };

  return {};
};