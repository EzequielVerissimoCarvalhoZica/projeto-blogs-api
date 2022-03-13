const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  const SECRET = process.env.JWT_SECRET;

  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  try {
    const decoded = jwt.verify(authorization, SECRET);
    const user = await User.findOne({ where: { email: decoded.data.email } });

    req.user = user;

    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};