const verifyEmail = (email) => {
  if (!email) return { err: '"email" is required', code: 400 };
  const splittedEmail = email.split('@');
  if (!splittedEmail[0] || !splittedEmail[1]) {
    return {
      err: '"email" must be a valid email',
      code: 400,
    };
  }
  return {};
};

const verifyPass = (password) => {
  if (!password) return { err: '"password" is required', code: 400 };

  if (password.length !== 6) {
    return {
      err: '"password" length must be 6 characters long',
      code: 400,
    };
  }
  return {};
};

const verifyName = (displayName) => {
  if (displayName.length < 8) {
    return {
      err: '"displayName" length must be at least 8 characters long',
      code: 400,
    };
  }
  return {};
};

const verifyUser = (displayName, email, password) => {
  const resultName = verifyName(displayName);
  if (resultName.err) return resultName;

  const resultEmail = verifyEmail(email);
  if (resultEmail.err) return resultEmail;

  const resultPass = verifyPass(password);
  if (resultPass.err) return resultPass;

  return {};
};
module.exports = verifyUser;