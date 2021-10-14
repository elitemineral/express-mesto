const dataModels = {
  user: 'user',
  card: 'card',
};

const statusCodes = {
  badRequest: 400,
  notAuthorized: 401,
  forbidden: 403,
  notFound: 404,
  duplicateError: 409,
  serverError: 500,
};

module.exports = {
  dataModels,
  statusCodes,
};
