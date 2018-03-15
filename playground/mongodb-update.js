const { MongoClient } = require('mongodb');
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'newTodo';

// Use connect method to connect to the server
MongoClient.connect(url, (err, client) => {
  assert.equal(null, err);
  console.log(`Connected successfully to mongodb server running on ${url}`);
  /* eslint no-shadow:0 */

  // create db instance
  const db = client.db(dbName);

  // create collection instance
  const todosCollection = db.collection('Todos');
  const usersCollection = db.collection('Users');
  // find one and update todo
  todosCollection
    .findOneAndUpdate(
      { text: 'sometext', completed: true },
      {
        $set: {
          completed: false
        }
      },
      { returnOriginal: false }
    )
    .then(
      result => {
        console.log(JSON.stringify(result, undefined, 2));
      },
      err => {
        console.log('error updating', err);
      }
    );

  // Change username
  usersCollection
    .findOneAndUpdate({ name: 'Deepak' }, { $set: { name: 'dip4k' } }, { returnOriginal: false })
    .then(
      result => {
        console.log(JSON.stringify(result, undefined, 2));
      },
      err => {
        console.log('error in updating username\n', err);
      }
    );

  // close connection when done
  client.close();
});
