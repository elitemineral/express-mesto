const User = require('../models/user');

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send(user))
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
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

module.exports.setUserAvatar = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true },
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => next(err));
};
