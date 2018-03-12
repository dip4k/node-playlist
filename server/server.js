const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('hello world');
});

// app.get('/', (req, res) => {
//   res.status(200).send({ error: 'page not found' });
// });

app.listen(3000, () => {
  console.log('server running on port 3000...');
});

module.exports.app = app;
