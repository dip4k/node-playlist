console.log("Starting notes");

let addNote = (title, body) => {
  console.log(`${title} : ${body}`);
};

let removeNote = title => {
  console.log(`note with title ${title} is removed...`);
};

let getNOte = title => {
  console.log(`Reading note with title ${title}...`);
};
let getAll = () => {
  console.log("returning all notes");
};
module.exports = {
  addNote,
  removeNote,
  getNOte,
  getAll
};
