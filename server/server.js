const express = require('express');
const bodyParser = require('body-parser');

// import mongoose conn
const { mongoose } = require('../db/mongoose');

// model should always come after mongoose connection
const Todo = require('../models/todoModel');
const User = require('../models/UserModel');

// Port
const port = 3000;

// app
const app = express();

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// --- handling requests

// create todo
app.post('/todos', (req, res) => {
  let todo = new Todo({ text: req.body.text });
  todo.save().then(
    doc => {
      res.json(doc);
    },
    err => {
      res.status(400).send(err);
    }
  );
});

// get all todos
app.get('/todos', (req, res) => {
  Todo.find().then(
    list => {
      res.json(list);
    },
    err => {
      res.status(400).send(err);
    }
  );
});

// --- start server
app.listen(port, () => {
  console.log(`server started on port: ${port}`);
});
