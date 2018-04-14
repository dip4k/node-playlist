const router = require('express').Router();
const _ = require('lodash');
const { ObjectID } = require('mongodb');
const { Todo } = require('../models/todoModel');
const { authenticate } = require('../middleware/authenticate');
/* eslint no-underscore-dangle:0 */
// create todo
router.post('/', authenticate, (req, res) => {
  let todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });

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
router.get('/', authenticate, (req, res) => {
  Todo.find({ _creator: req.user._id })
    .then((todos) => {
      res.status(200).send({ todos });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// get todo by id
router.get('/:id', authenticate, (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.status(404);
    return res.send({ message: 'Invalid ObjectID' });
  }
  Todo.findOne({
    _id: id,
    _creator: req.user._id
  })
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
router.delete('/:id', authenticate, (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send({ err_msg: 'Invalid id' });
  }
  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  })
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
router.patch('/:id', authenticate, (req, res) => {
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

  Todo.findOneAndUpdate(
    { _id: id, _creator: req.user._id },
    { $set: body },
    { new: true }
  )
    .then((updatedTodo) => {
      if (!updatedTodo) {
        return res.status(404).send({ err_msg: 'No todo present with this id' });
      }
      res.status(200).send({ todo: updatedTodo });
    })
    .catch((e) => {
      res.status(400).send({ err_msg: e });
    });
});

module.exports = router;
