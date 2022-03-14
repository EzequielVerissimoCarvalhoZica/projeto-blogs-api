const postService = require('../services/postService');

const create = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { user } = req;

  const response = await postService.create({ user, title, content, categoryIds });
  if (response.err) return res.status(response.code).json({ message: response.err });

  return res.status(201).json(response);
};

const findAll = async (req, res) => {
  const { user } = req;

  const posts = await postService.findAll(user);

  return res.status(200).json(posts);
};

const findById = (_req, _res) => {};

module.exports = {
  create,
  findAll,
  findById,
};