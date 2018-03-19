const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
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
  todo
    .save()
    .then(doc => {
      res.status(201).send(doc);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// get all todos
app.get('/todos', (req, res) => {
  Todo.find()
    .then(todos => {
      res.status(200).send({ todos });
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// get todo by id
app.get('/todos/:id', (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    res.status(404);
    return res.send({ message: 'Invalid ObjectID' });
  }
  Todo.findById(req.params.id)
    .then(todo => {
      if (!todo) {
        res.status(404).send({ message: `no todo item exist with ${req.params.id}` });
      }
      res.status(200).send({ todo });
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// --- start server
app.listen(port, () => {
  console.log(`server started on port: ${port}`);
});

module.exports = { app };
