const _ = require('lodash');
const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const validator = require('validator');
const jwt = require('jsonwebtoken');

const keys = require('../../config/keys');

let userSchema = new Schema(
  {
    email: {
      required: true,
      type: String,
      minlength: 4,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: '{VALUE} is not a valid email id!'
      }
    },
    password: {
      type: String,
      required: true,
      minlength: 4
    },
    tokens: [
      {
        access: {
          type: String,
          required: true
        },
        token: {
          type: String,
          required: true
        }
      }
    ]
  },
  {
    collection: 'Users'
  }
);
/* eslint func-names:0  */
/* eslint no-underscore-dangle:0 */

userSchema.methods.generateAuthTokens = function() {
  let user = this;
  let access = 'auth';
  let token = jwt
    .sign({ _id: user._id.toHexString(), access }, keys.authSecret)
    .toString();
  user.tokens.push({ access, token });
  // console.log(user);
  return user.save().then(() => token);
};

// overriding default toJSON method.
userSchema.methods.toJSON = function() {
  let user = this;

  // convert model to object only props remain in object
  let userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

let User = mongoose.model('User', userSchema);

module.exports = { User };

// let mongoose = require('mongoose');

// let User = mongoose.model('User', {
//   email: {
//     type: String,
//     required: true,
//     trim: true,
//     minlength: 1
//   }
// });

// module.exports = { User };
