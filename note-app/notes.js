const fs = require("fs");

const fetchNotes = () => {
  try {
    // read already available notes from file

    return JSON.parse(fs.readFileSync("note-data.json"));
  } catch (e) {
    return [];
  }
};

const saveNotes = notes => {
  fs.writeFileSync("note-data.json", JSON.stringify(notes));
};

const addNote = (title, body) => {
  const notes = fetchNotes();
  const note = { title, body };

  // check for duplicates

  const duplicateNote = notes.filter(item => item.title === title);
  if (duplicateNote.length === 0) {
    // push new note to array and write to file

    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

const removeNote = title => {
  const notes = fetchNotes();
  const newNotes = notes.filter(note => note.title !== title);
  saveNotes(newNotes);
  return notes.length !== newNotes.length;
};

const getNote = title => {
  const notes = fetchNotes();
  const note = notes.filter(item => item.title === title);
  if (note.length > 0) {
    return note;
  }
};
const getAll = () => fetchNotes();

function logNotes(item) {
  console.log(`--> title: ${item.title}  body: ${item.body}`);
}
module.exports = {
  addNote,
  removeNote,
  getNote,
  getAll,
  logNotes
};
