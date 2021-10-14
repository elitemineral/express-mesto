const mongoose = require('mongoose');
const { dataModels } = require('../utils/constants');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    validate: {
      // eslint-disable-next-line no-useless-escape
      validator: (value) => /^https?:\/\/(www\.)*[\w\-.~:\/?#\[\]@!$&'\(\)*+,;=]+/.test(value),
      message: (props) => `${props.value} некорректная ссылка`,
    },
    required: [true, 'Ссылка обязательна'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: dataModels.user,
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: dataModels.user,
    required: true,
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model(dataModels.card, cardSchema);
