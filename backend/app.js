const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors, celebrate } = require('celebrate');

const router = require('./routes');

const { createUser, login } = require('./controllers/users');
const { registerValidation, loginValidation } = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');

const NotFound = require('./errors/notFoundError');

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.post('/signin', celebrate(loginValidation), login);
app.post('/signup', celebrate(registerValidation), createUser);

app.use(auth);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(() => {
  throw (new NotFound('Маршрут не существует'));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });

  next();
});

app.listen(PORT, () => {
  console.log('Я запущен!');
});
