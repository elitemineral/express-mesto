const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { statusCodes } = require('./utils/constants');
const UnauthorizedError = require('./errors/UnauthorizedError');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

const app = express();

app.use(helmet());
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
  if (err instanceof UnauthorizedError) {
    res.status(err.statusCode).send({ message: err.message });
    return;
  }

  if (err.name === 'DocumentNotFoundError') {
    res.status(statusCodes.notFound).send({ message: 'Запрашиваемый элемент не найден' });
    return;
  }

  if (err.name === 'CastError' || err.name === 'ValidationError') {
    res.status(statusCodes.badRequest).send({ message: 'Указаны некорректные данные' });
    return;
  }

  res.status(statusCodes.serverError).send({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
