const Sequelize = require('sequelize');
const config = require('../sequelize/config');
const { BlogPost, Categorie, PostCategorie, User } = require('../models');
const verifyAllCategoriesExist = require('../helpers/verifyAllCategoriesExist');
const verifyPost = require('../helpers/verifyPost');

const sequelize = new Sequelize(config.development);

const create = async ({ user, title, content, categoryIds }) => {
  const resultVerify = verifyPost(title, content, categoryIds);
  if (resultVerify.err) return resultVerify;

  const resultVerifyCategories = await verifyAllCategoriesExist(categoryIds);
  if (resultVerifyCategories.err) return resultVerifyCategories;

  const t = await sequelize.transaction();
  try {
    const postCreated = await BlogPost
    .create({ userId: user.id, title, content }, { transaction: t });

    const postCategoriesCreated = categoryIds
    .map((c) => PostCategorie
    .create({ postId: postCreated.id, categoryId: c }, { transaction: t }));

    await Promise.all(postCategoriesCreated);
    await t.commit();

    return { postCreated, code: 201 };
  } catch (error) {
    await t.rollback();

    return { err: 'sorry, something went wrong', code: 500 };
  }
};

const findAll = async () => {
  const posts = await BlogPost.findAll({
    attributes: { exclude: ['userId'] },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categorie, as: 'categories', through: { attributes: [] } },
    ],
  });

  return { posts, code: 200 };
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

const update = async (user, id, title, content) => {
  if (!title) return { err: '"title" is required', code: 400 };
  if (!content) return { err: '"content" is required', code: 400 };

  const find = await BlogPost.findOne({
    where: { userId: user.id, id },
    include: { model: Categorie, as: 'categories', through: { attributes: [] } },
  });

  if (!find) return { err: 'Unauthorized user', code: 401 };

  await BlogPost.update({ title, content }, { where: { id } });

  const updated = {
    title,
    content,
    userId: user.id,
    categories: find.categories,
  };

  return { updated, code: 200 };
};

const destroy = async (user, id) => {
  const post = await BlogPost.findByPk(id);

  if (!post) return { err: 'Post does not exist', code: 404 };
  
  if (post.userId !== user.id) return { err: 'Unauthorized user', code: 401 };

  await BlogPost.destroy({
    where: { id },
  });

  return { code: 204 };
};

const findByQuery = async (query) => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categorie, as: 'categories', through: { attributes: [] } },
    ],
  });

  const postsfiltered = posts.filter((p) => p.title.includes(query) || p.content.includes(query));

  return { posts: postsfiltered, code: 200 };
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  destroy,
  findByQuery,
};