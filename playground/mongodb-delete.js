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

  // delete all document with text:sometext
  // todosCollection.deleteMany({ text: 'sometext' }).then(
  //   result => {
  //     console.log(JSON.stringify(result, undefined, 2));
  //   },
  //   err => {
  //     console.log('error deleting', err);
  //   }
  // );

  // delete first document with text:sometext
  // todosCollection.deleteOne({ text: 'sometext' }).then(
  //   result => {
  //     console.log('deleted first doc', JSON.stringify(result, undefined, 2));
  //   },
  //   err => {
  //     console.log('errors while deleting one', err);
  //   }
  // );

  // find and delete
  todosCollection.findOneAndDelete({ text: 'sometext', completed: false }).then(
    result => {
      console.log('Deleted todo');
      console.log(JSON.stringify(result, undefined, 2));

      // n gives 0/1 and value is deleted object
      console.log(
        `is deleted: ${result.lastErrorObject.n}`,
        `\ndeleted object: ${JSON.stringify(result.value, undefined, 2)}`
      );
    },
    err => {
      console.log('error in find and delete', err);
    }
  );

  // delete user
  db
    .collection('Users')
    .deleteMany({ name: 'Deepak' })
    .then(
      res => {
        console.log(JSON.stringify(res, undefined, 2));
      },
      err => {
        console.log('error', err);
      }
    );

  // close connection when done
  client.close();
});
