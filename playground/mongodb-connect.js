// const MongoClient = require('mongodb').MongoClient;
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
  const db = client.db(dbName);
  const usersCollecttion = db.collection('Users');
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
  /* eslint no-underscore-dangle:0 */
  // insert users {name,age,location}
  // usersCollecttion.insertOne(
  //   { _id: new ObjectID(20), name: 'Deepak', age: 24, location: 'nashik' },
  //   (err, result) => {
  //     if (err) {
  //       return console.log('unable to insert user', err);
  //     }
  //     return console.log(JSON.stringify(result.ops[0]._id, undefined, 2));
  //   }
  // );

  /* find/query */

  // usersCollecttion.find({ name: 'dipak' }).toArray((err, docs) => {
  //   if (err) {
  //     return console.log('Unable to find users', err);
  //   }
  //   console.log(`Found ${docs.length} user record`);
  //   return console.log(docs);
  // });
  todosCollection.find({ completed: false }).toArray((err, docs) => {
    if (err) {
      return console.log('error in finding todos', err);
    }
    console.log(`Found ${docs.length} todos record`);
    return console.log(docs);
  });

  // update todos collection

  // todosCollection.updateOne({ completed: false }, { $set: { completed: true } }, (err, result) => {
  //   if (err) {
  //     return console.log('error updating todos ', err);
  //   }
  //   return console.log(JSON.stringify(result, undefined, 2));
  // });

  // delete todos
  // todosCollection.deleteMany({ completed: true }, (err, result) => {
  //   if (err) {
  //     return console.log('Error deleting items ', err);
  //   }
  //   console.log(JSON.stringify(result, undefined, 2));

  //   console.log('Removed the todo with the with complete status true');
  // });
  client.close();
});
