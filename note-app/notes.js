const fs = require("fs");

var fetchNotes = () => {
  try {
    // read already available notes from file

    return JSON.parse(fs.readFileSync("note-data.json"));
  } catch (e) {
    return [];
  }
};

var saveNotes = notes => {
  fs.writeFileSync("note-data.json", JSON.stringify(notes));
};

let addNote = (title, body) => {
  let notes = fetchNotes();
  var note = { title, body };

  // check for duplicates

  let duplicateNote = notes.filter(note => note.title === title);
  if (duplicateNote.length === 0) {
    // push new note to array and write to file

    notes.push(note);
    saveNotes(notes);
    return note;
  }
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
