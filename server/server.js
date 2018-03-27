const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
// import mongoose conn
const { mongoose } = require('./db/mongoose');

// model should always come after mongoose connection
const { Todo } = require('./models/todoModel');
const { User } = require('./models/UserModel');

// Port
const port = process.env.PORT || 3000;

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
    .then((doc) => {
      res.status(201).send(doc);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// get all todos
app.get('/todos', (req, res) => {
  Todo.find()
    .then((todos) => {
      res.status(200).send({ todos });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// get todo by id
app.get('/todos/:id', (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.status(404);
    return res.send({ message: 'Invalid ObjectID' });
  }
  Todo.findById(id)
    .then((todo) => {
      if (!todo) {
        res.status(404).send({ message: `no todo item exist with id : $id}` });
      }
      res.status(200).send({ todo });
    })
    .catch(() => {
      res.status(400).send();
    });
});

// delete todo by id
app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send({ err_msg: 'Invalid id' });
  }
  Todo.findByIdAndRemove(id)
    .then((todo) => {
      if (!todo) {
        return res.status(404).send({ message: `no todo item exist with id: ${id}` });
      }
      res.status(200).send({ todo });
    })
    .catch((e) => {
      res.status(400).send({ err_msg: e });
    });
});

// Update todo
app.patch('/todos/:id', (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send({ err_msg: 'Invalid id' });
  }
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, { $set: body }, { new: true, runValidators: true })
    .then((updatedTodo) => {
      if (!updatedTodo) {
        return res.status(404).send({ err_msg: 'No todo present with this id' });
      }
      res.status(200).send({ updatedTodo });
    })
    .catch((e) => {
      res.status(400).send({ err_msg: e });
    });
});

// --- start server
app.listen(port, () => {
  console.log(`server started on port: ${port}`);
});

module.exports = { app };
