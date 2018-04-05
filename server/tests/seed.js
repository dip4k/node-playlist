const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const { Todo } = require('../models/todoModel');
const { User } = require('../models/UserModel');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
/* eslint array-element-newline:0 */
const users = [
  {
    _id: userOneId,
    email: 'andrew@example.com',
    password: 'userOnePass',
    tokens: [
      {
        access: 'auth',
        token: jwt.sign({ _id: userOneId, access: 'auth' }, 'abc123').toString()
      }
    ]
  },
  {
    _id: userTwoId,
    email: 'jen@example.com',
    password: 'userTwoPass'
  }
];

const todos = [
  {
    _id: new ObjectID(),
    text: 'First test todo'
  },
  {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
  }
];

const populateTodos = (done) => {
  Todo.remove({})
    .then(() => {
      Todo.insertMany(todos);
    })
    .then(done());
};

const populateUsers = (done) => {
  User.remove({})
    .then(() => {
      let userOne = new User(users[0]).save();
      let userTwo = new User(users[1]).save();

      return Promise.all([userOne, userTwo]);
    })
    .then(done());
};

module.exports = { todos, populateTodos, users, populateUsers };
