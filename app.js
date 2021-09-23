const express = require('express');
const mongoose = require('mongoose');

const { appRoutes } = require('./utils/constants');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, _res, next) => {
  req.user = {
    _id: '614ccab2f74dc61c9b724d45',
  };

  next();
});

app.use(appRoutes.root, usersRouter);
app.use(appRoutes.root, cardsRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
