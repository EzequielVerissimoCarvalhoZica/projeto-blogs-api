const categorieService = require('../services/categorieService');

const create = async (req, res) => {
  const { name } = req.body;

  const created = await categorieService.create({ name });

  if (created.err) return res.status(created.code).json({ message: created.err });
  console.log(created);
  return res.status(201).json(created);
};

const findAll = (_req, _res) => {};

module.exports = {
  create,
  findAll,
};