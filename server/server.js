const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('hello world');
});

app.get('/error', (req, res) => {
  res.status(404).send({ error: 'page not found' });
});

// returns json
app.get('/user', (req, res) => {
  res.status(201).json({ name: 'Dipak', id: 'dip4k' });
});
app.listen(3000, () => {
  console.log('server running on port 3000...');
});

module.exports.app = app;
