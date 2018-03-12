module.exports.add = (a, b) => a + b;
module.exports.sqr = a => a ** 2;

module.exports.user = fullName => {
  const names = fullName.split(' ');
  const user = {};
  user.fName = names[0];
  user.lName = names[1];
  return user;
};

/* eslint standard/no-callback-literal: [0, ["cb", "callback"]] */
module.exports.asyncAdd = (a, b, cb) => {
  setTimeout(() => {
    cb(a + b);
  }, 100);
};

module.exports.asyncSqr = (a, cb) => {
  setTimeout(() => {
    cb(a * a);
  }, 100);
};
