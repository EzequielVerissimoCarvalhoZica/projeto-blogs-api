const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const SECRET = process.env.JWT_SECRET;

  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  try {
    const decoded = jwt.verify(authorization, SECRET);

    req.user = decoded;

    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};