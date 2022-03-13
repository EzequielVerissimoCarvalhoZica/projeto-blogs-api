const { BlogPost, Categorie, PostCategorie } = require('../models');
const verifyPost = require('../helpers/verifyPost');

const create = async ({ user, title, content, categoryIds }) => {
  const resultVerify = verifyPost(title, content, categoryIds);
  if (resultVerify.err) return resultVerify;

  const categories = await Categorie.findAll();
  const ids = categories.map(({ id }) => id);
  const allCategoriesExist = categoryIds.every((c) => ids.includes(c));

  if (!allCategoriesExist) return { err: '"categoryIds" not found', code: 400 };

  const postCreated = await BlogPost
  .create({ userId: user.id, title, content });

  const postCategoriesCreated = categoryIds
  .map((c) => PostCategorie
  .create({ postId: postCreated.id, categoryId: c }));

  await Promise.all(postCategoriesCreated);

  return postCreated;
};

const findAll = () => {};

const findById = () => {};

module.exports = {
  create,
  findAll,
  findById,
};