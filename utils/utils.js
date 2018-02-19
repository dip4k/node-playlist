module.exports.add = (a, b) => a + b;
module.exports.sqr = a => a ** 2;

module.exports.user = fullName => {
  const names = fullName.split(" ");
  const user = {};
  user.fName = names[0];
  user.lName = names[1];
  return user;
};

module.exports.asyncAdd = (a, b, cb) => {
  setTimeout(() => {
    cb(a + b);
  }, 100);
};

module.exports.asyncSqr = (a, cb) => {
  setTimeout(() => {
    cb(a ** 2);
  }, 100);
};
