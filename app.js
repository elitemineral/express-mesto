const express = require('express');
const mongoose = require('mongoose');

const { appRoutes } = require('./utils/constants');
const router = require('./routes/users');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(appRoutes.root, router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
