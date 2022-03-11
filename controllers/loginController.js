const loginService = require('../services/loginService');

const create = async (req, res) => {
  const { email, password } = req.body;

  const response = await loginService.create({ email, password });
  if (response.err) return res.status(response.code).json({ message: response.err });

  return res.status(200).json({ token: response });
};

module.exports = {
  create,
};