const User = require('../models/user');
const { statusCodes } = require('../utils/constants');

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(statusCodes.notFound).send({ message: 'Запрашиваемый элемент не найден' });
        return;
      }

      res.send(user);
    })
    .catch((err) => next(err));
};

module.exports.getUsers = (_req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => next(err));
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

module.exports.setUserInfo = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        res.status(statusCodes.notFound).send({ message: 'Запрашиваемый элемент не найден' });
        return;
      }

      res.send(user);
    })
    .catch((err) => next(err));
};

module.exports.setUserAvatar = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true },
  )
    .then((user) => res.send(user))
    .catch((err) => next(err));
};
