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

const findById = async (req, res) => {
  const { id } = req.params;

  const { code, err, post } = await postService.findById(id);

  if (err) return res.status(code).json({ message: err });

  return res.status(code).json(post);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { title, content, categoryIds } = req.body;
  const { user } = req;

  if (categoryIds) return res.status(400).json({ message: 'Categories cannot be edited' });

  const { code, err, updated } = await postService.update(user, id, title, content);

  if (err) return res.status(code).json({ message: err });

  return res.status(code).json(updated);
};

const destroy = async (req, res) => {
  const { id } = req.params;
  const { user } = req;

  const { code, err } = await postService.destroy(user, id);

  if (err) return res.status(code).json({ message: err });

  return res.status(code).end();
};

const findByQuery = async (req, res) => {
  const { q } = req.query;

  const { code, err, posts } = await postService.findByQuery(q);

  if (err) return res.status(code).json({ message: err });

  return res.status(code).json(posts);
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  destroy,
  findByQuery,
};