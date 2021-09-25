const express = require('express');
const mongoose = require('mongoose');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { statusCodes } = require('./utils/constants');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, _res, next) => {
  req.user = {
    _id: '614f48a5ef07e86f0b1f8100',
  };

  next();
});

app.use('/', usersRouter, cardsRouter, (_req, _res, next) => next());
app.use((_req, res) => res.status(statusCodes.notFound).send({ message: 'Запрашиваемая страница не найдена' }));

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  if (err.name === 'ValidationError') {
    res.status(statusCodes.badRequest).send({ message: 'Указаны некорректные данные' });
    return;
  }

  if (err.name === 'CastError') {
    res.status(statusCodes.notFound).send({ message: 'Запрашиваемый элемент не найден' });
    return;
  }

  res.status(statusCodes.serverError).send({ message: 'На сервере произошла ошибка' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
