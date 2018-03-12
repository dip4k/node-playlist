const db = require('./db');

module.exports.handleSignup = (email, password) => {
  // Check if email already exists
  // save to db
  db.saveUser({ email, password });
  // send the signup success email
};
