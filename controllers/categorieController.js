const { Categorie } = require('../models');
const categorieService = require('../services/categorieService');

const create = async (req, res) => {
  const { name } = req.body;

  const { created, code, err } = await categorieService.create({ name });

  if (err) return res.status(code).json({ message: err });

  return res.status(code).json(created);
};

const findAll = async (_req, res) => {
  const categories = await Categorie.findAll();

  return res.status(200).json(categories);
};

module.exports = {
  create,
  findAll,
};