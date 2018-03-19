const mongoose = require('mongoose');

// mongoose.Promise = global.Promise;

const dbName = 'newTodo';
mongoose.connect(`mongodb://localhost/${dbName}`);
(function checkConnection() {
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log(`Mongoose is connected to ${dbName} Database.`);
  });
})();

module.exports = { mongoose };

// const mongoose = require('mongoose');

// mongoose.Promise = global.Promise;

// const dbName = 'newTodo';

// mongoose.connect(`mongodb://localhost/${dbName}`);
// mongoose.connect('mongodb://localhost:27017/TodoApp');

// (function checkConnection() {
//   let db = mongoose.connection;
//   db.on('error', console.error.bind(console, 'connection error:'));
//   db.once('open', () => {
//     console.log(`Mongoose is connected to ${dbName} Database.`);
//   });
// })();
// module.exports = { mongoose };
