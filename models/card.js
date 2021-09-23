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
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: dataModels.user,
    required: true,
  },
  likes: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: dataModels.user,
      required: true,
    }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model(dataModels.card, cardSchema);