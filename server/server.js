require('../config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

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

const { authenticate } = require('./middleware/authenticate');

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
      res.status(400).send({ errmsg: e.errmsg });
    });
});

app.get('/users/me', authenticate, (req, res, next) => {
  res.send(req.user);
});

// POST /users/login {email, password}
app.post('/users/login', (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);
  User.findByCredentials(body.email, body.password)
    .then((user) => {
      // console.log(JSON.stringify(user.tokens, undefined, 2));
      user.generateAuthTokens().then((token) => {
        // console.log(token);
        res
          .header('x-auth', token)
          .status(200)
          .send(user);
      });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(400).json({ error: err.message });
    });
});

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(
    () => {
      res.status(200).json('Logout Successfully');
    },
    (err) => {
      res.status(400).send('Logout failed', err);
    }
  );
});
// --- start server
app.listen(port, () => {
  console.log(`server started on port: ${port}`);
});

module.exports = { app };
