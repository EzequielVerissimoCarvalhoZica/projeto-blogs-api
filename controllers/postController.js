const postService = require('../services/postService');

const create = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { user } = req;

  const response = await postService.create({ user, title, content, categoryIds });
  if (response.err) return res.status(response.code).json({ message: response.err });

  return res.status(201).json(response);
};

const findAll = (_req, _res) => {};

const findById = (_req, _res) => {};

module.exports = {
  create,
  findAll,
  findById,
};