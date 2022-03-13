module.exports = (title, content, categoryIds) => {
  if (!title) return { err: '"title" is required', code: 400 };
  if (!content) return { err: '"content" is required', code: 400 };
  if (!categoryIds) return { err: '"categoryIds" is required', code: 400 };
  if (!Array.isArray(categoryIds)) return { err: '"categoryIds" is not array', code: 400 };

  return {};
};