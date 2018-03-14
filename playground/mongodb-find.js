const { MongoClient, ObjectID } = require('mongodb');
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

  // insert document to collection Todos
  db.collection('Todos').insertOne(
    {
      text: 'sometext',
      completed: false
    },
    (err, result) => {
      if (err) {
        return console.log('unable to insert todo', err);
      }
      return console.log(JSON.stringify(result.ops, undefined, 2));
    }
  );

  // find in collection
  todosCollection.find({ completed: false }).toArray((err, docs) => {
    if (err) {
      return console.log('error in finding todos', err);
    }
    console.log(`Found ${docs.length} todos record`);
    return console.log(JSON.stringify(docs, undefined, 2));
  });

  // find todos and convert them to array of todo object use promises
  todosCollection
    .find()
    .toArray()
    .then(
      docs => {
        console.log('Todos found ', docs);
        console.log(JSON.stringify(docs, undefined, 2));
      },
      err => {
        console.log('error occured while finding todos', err);
      }
    );

  todosCollection
    .find({ _id: new ObjectID('5aa8b6b15b835d1c74f1cb1d') })
    .toArray()
    .then(
      docs => {
        console.log(JSON.stringify(docs, undefined, 2));
      },
      err => {
        console.log('error in find by id', err);
      }
    );
  // close connection when done
  client.close();
});
