const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

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
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signin', loginInfoValidator(), login);
app.post('/signup', newUserInfoValidator(), createUser);

app.use('/', auth, usersRouter, cardsRouter, (_req, _res, next) => next());
app.use((_req, _res, next) => next(new NotFoundError('Запрашиваемая страница не найдена')));

app.use(errors);

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
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
