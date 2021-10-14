const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const {
  loginInfoValidator,
  newUserInfoValidator,
} = require('./utils/requestValidators');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const auth = require('./middlewares/auth');
const errors = require('./middlewares/celebrateErrorHandler');

const { login, createUser } = require('./controllers/users');
const { statusCodes } = require('./utils/constants');

const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/sign-in', loginInfoValidator(), login);
app.post('/sign-up', newUserInfoValidator(), createUser);

app.use('/', auth, usersRouter, cardsRouter, (_req, _res, next) => next());
app.use((_req, _res, next) => next(new NotFoundError('Запрашиваемая страница не найдена')));

app.use(errors);

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    res.status(statusCodes.badRequest).send({ message: err.message });
    return;
  }

  if (err.name === 'MongoServerError' && err.code === 11000) {
    res.status(statusCodes.duplicateError).send({ message: 'Пользователь с таким email уже существует' });
    return;
  }

  const { statusCode = statusCodes.serverError, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === statusCodes.serverError
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
