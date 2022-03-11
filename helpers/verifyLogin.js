module.exports = (email, password) => {
  if (email === '') return { err: '"email" is not allowed to be empty', code: 400 };

  if (!email) return { err: '"email" is required', code: 400 };
  
  if (password === '') return { err: '"password" is not allowed to be empty', code: 400 };

  if (!password) return { err: '"password" is required', code: 400 };

  return {};
};