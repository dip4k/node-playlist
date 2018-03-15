let mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

let userSchema = new Schema(
  { email: { required: true, type: String, minlength: 4 } },
  { collection: 'Users' }
);

let User = mongoose.model('User', userSchema);

module.exports = User;
