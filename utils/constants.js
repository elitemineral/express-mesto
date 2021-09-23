const appRoutes = {
  root: '/',
  user: '/users/:userId',
  users: '/users',
  card: '/cards/:cardId',
  cards: '/cards',
};

const dataModels = {
  user: 'user',
  card: 'card',
};

module.exports = {
  appRoutes,
  dataModels,
};
