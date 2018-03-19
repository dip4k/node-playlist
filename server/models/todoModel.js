const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

let todoSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      minlength: 2,
      trim: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    completedAt: {
      type: Number,
      default: null
    }
  },
  { collection: 'Todos' }
);

const Todo = mongoose.model('Todo', todoSchema);

module.exports = { Todo };

// const mongoose = require('mongoose');

// let Todo = mongoose.model('Todo', {
//   text: {
//     type: String,
//     required: true,
//     minlength: 1,
//     trim: true
//   },
//   completed: {
//     type: Boolean,
//     default: false
//   },
//   completedAt: {
//     type: Number,
//     default: null
//   }
// });
// module.exports = { Todo };
