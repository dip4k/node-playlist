// console.log("begin");

// setTimeout(() => {
//   console.log("callback");
// }, 2000);

// console.log("end");

const getUser = (id, callback) => {
  const user = { id, name: 'dip4k' };
  setTimeout(() => {
    callback(user);
  }, 2000);
};

getUser(40, uesrObj => {
  console.log(uesrObj);
});
