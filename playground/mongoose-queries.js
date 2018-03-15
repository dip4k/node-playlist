const { ObjectID } = require('mongodb');

const { mongoose } = require('../db/mongoose');
const Todo = require('../models/todoModel');
const User = require('../models/UserModel');

// var id = '57bf38394b39c93d2a557e9811';
//
// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Id not found');
//   }
//   console.log('Todo By Id', todo);
// }).catch((e) => console.log(e));

User.findById('5aaa3620173b6c0c18471456').then(
  user => {
    if (!user) {
      return console.log('Unable to find user');
    }

    console.log(JSON.stringify(user, undefined, 2));
  },
  e => {
    console.log(e);
  }
);

// User.find().then(
//   user => {
//     if (!user) {
//       return console.log('Unable to find user');
//     }

//     console.log(JSON.stringify(user, undefined, 2));
//   },
//   e => {
//     console.log(e);
//   }
// );
