const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');

let data = { id: 20 };

// let token = jwt.sign({ data, exp: 60 * 60 }, 'secret key or salt');
let token = jwt.sign(data, 'secret key or salt', { expiresIn: '1h' });
// let token = jwt.sign(data, 'secret key or salt');

console.log(token);

let decoded = jwt.verify(token, 'secret key or salt');
console.log(decoded);
// const CryptoJS = require('crypto-js');

// console.log(CryptoJS.MD5('dipak', 'abcd').toString());
// // console.log('message');
// // console.log(SHA256('message').toString());

// let data = { id: 5 };

// let token = {
//   data,
//   hash: SHA256(`${JSON.stringify(data)} abcd`).toString()
// };

// let checkhash = SHA256(`${JSON.stringify(token.data)} abcd`).toString();
// token.data.id = 10;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// if (checkhash === token.hash) {
//   console.log('mach');
// } else {
//   console.log('not matched!!...');
// }
