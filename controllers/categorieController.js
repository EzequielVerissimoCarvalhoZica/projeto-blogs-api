const { Categorie } = require('../models');
const categorieService = require('../services/categorieService');

const create = async (req, res) => {
  const { name } = req.body;

  const created = await categorieService.create({ name });

  if (created.err) return res.status(created.code).json({ message: created.err });

  return res.status(201).json(created);
};

const findAll = async (_req, res) => {
  const categories = await Categorie.findAll();

  return res.status(200).json(categories);
};

module.exports = {
  create,
  findAll,
};