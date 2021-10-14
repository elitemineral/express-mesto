const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, _res, next) => {
  const { authorization } = req.headers;

  const error = new UnauthorizedError('С токеном что-то не так');

  if (!(authorization && authorization.startsWith('Bearer '))) {
    throw error;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    throw error;
  }

  req.user = payload;

  next();
};
