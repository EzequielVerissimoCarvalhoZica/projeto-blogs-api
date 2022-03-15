const loginService = require('../services/loginService');

const create = async (req, res) => {
  const { email, password } = req.body;

  const { err, code, token } = await loginService.create({ email, password });
  if (err) return res.status(code).json({ message: err });

  return res.status(code).json({ token });
};

module.exports = {
  create,
};