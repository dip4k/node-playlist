const mongoose = require('mongoose');

// mongoose.Promise = global.Promise;

// const dbName = 'newTodo';
mongoose.connect(process.env.MONGODB_URI, () => {
  console.log('mongodb Database connection stablished...');
});
// (function checkConnection() {
//   let db = mongoose.connection;
//   db.on('error', console.error.bind(console, 'connection error:'));
//   db.once('open', () => {
//     console.log(`Mongoose is connected to ${dbName} Database.`);
//   });
// })();

module.exports = { mongoose };
