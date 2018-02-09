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
  let notes = fetchNotes();
  let newNotes = notes.filter(note => note.title !== title);
  saveNotes(newNotes);
  return notes.length !== newNotes.length;
};

let getNOte = title => {
  let notes = fetchNotes();
  let note = notes.filter(note => note.title === title);
  if (note.length > 0) {
    return note;
  }
};
let getAll = () => {
  let notes = fetchNotes();
  if (notes.length > 0) {
    return notes;
  }
};
module.exports = {
  addNote,
  removeNote,
  getNOte,
  getAll
};
