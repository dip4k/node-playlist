require('../config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

// import mongoose conn
// const { mongoose } = require('./db/mongoose');
require('./db/mongoose');

// model should always come after mongoose connection
const User = require('./models/UserModel').User;

const todosRoutes = require('./routes/todosRoute');
// Port
const port = process.env.PORT;

// app
const app = express();

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// --- handling requests
// todos route
app.use('/todos', todosRoutes);
// User routes --->>
app.post('/users', (req, res, next) => {
  const body = _.pick(req.body, ['email', 'password']);
  let user = new User(body);

  user
    .generateAuthTokens()
    .then((token) => {
      res.header('x-auth', token).send(user);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

// --- start server
app.listen(port, () => {
  console.log(`server started on port: ${port}`);
});

module.exports = { app };
