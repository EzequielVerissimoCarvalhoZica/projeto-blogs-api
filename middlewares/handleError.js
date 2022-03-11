module.exports = (_req, res, _next, err) => {
  console.error(err.message);

  return res.status(500).json({ err: err.message });
};