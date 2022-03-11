const jwt = require('jsonwebtoken');

module.exports = (displayName, email) => {
  const SECRET = process.env.JWT_SECRET;
  const jwtConfig = { expiresIn: '1d' };

  return jwt.sign({ data: { displayName, email } }, SECRET, jwtConfig);
};
