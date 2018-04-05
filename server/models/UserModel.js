const _ = require('lodash');
const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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
  // user.tokens = [];
  user.tokens.splice(0);
  user.tokens.push({ access, token });
  // console.log(user);
  return user.save().then(() => token);
};

// overriding default toJSON method.
userSchema.methods.toJSON = function() {
  let user = this;

  // convert model to object, only props remain in object
  let userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

userSchema.methods.removeToken = function(token) {
  let user = this;
  return user.update({ $pull: { tokens: { token } } });
};

// model method
userSchema.statics.findByToken = function(token) {
  let User = this;
  let decoded;
  try {
    decoded = jwt.verify(token, keys.authSecret);
  } catch (error) {
    return Promise.reject(error);
  }
  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

/* eslint no-shadow:0 handle-callback-err:0 */
userSchema.pre('save', function(next) {
  let user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (error, hash) => {
        user.password = hash;
        return next();
      });
    });
  } else {
    next();
  }
});

userSchema.statics.findByCredentials = function(email, password) {
  let User = this;

  return User.findOne({ email }).then((user) => {
    if (!user) {
      return Promise.reject(Error('Wrong username'));
    }

    return new Promise((resolve, reject) => {
      // Use bcrypt.compare to compare password and user.password
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject(Error('Password do not match'));
        }
      });
    });
  });
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
