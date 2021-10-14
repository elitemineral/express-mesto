const { celebrate, Joi } = require('celebrate');

// eslint-disable-next-line no-useless-escape
const urlRegEx = new RegExp(/^https?:\/\/(www\.)*[\w\-.~:\/?#\[\]@!$&'\(\)*+,;=]+/);

const userIdValidator = () => celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
});

const userInfoValidator = () => celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const userAvatarValidator = () => celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(urlRegEx),
  }),
});

const newCardInfoValidator = () => celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(urlRegEx),
    likes: Joi.array().items(Joi.string().alphanum().length(24)),
  }),
});

const cardIdValidator = () => celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
});

const loginInfoValidator = () => celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const newUserInfoValidator = () => celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlRegEx),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports = {
  userIdValidator,
  userInfoValidator,
  userAvatarValidator,
  newCardInfoValidator,
  cardIdValidator,
  loginInfoValidator,
  newUserInfoValidator,
};
