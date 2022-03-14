const { BlogPost, Categorie, PostCategorie, User } = require('../models');
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

const findAll = async () => {
  const posts = await BlogPost.findAll({
    attributes: { exclude: ['userId'] },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categorie, as: 'categories', through: { attributes: [] } },
    ],
  });

  return posts;
};

const findById = async (id) => {
  const post = await BlogPost.findByPk(id, {
    attributes: { exclude: ['userId'] },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categorie, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!post) return { err: 'Post does not exist', code: 404 };

  return { post, code: 200 };
};

module.exports = {
  create,
  findAll,
  findById,
};