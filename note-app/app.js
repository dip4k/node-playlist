const fs = require("fs");
const _ = require("lodash");
const argv = require("yargs").argv;
const notes = require("./notes");

var command = argv._[0];
console.log(command);

if (command === "add") {
  var note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log(`--> note: Added \ntitle: ${note.title} body: ${note.body}`);
  } else {
    console.log("note title taken");
  }
} else if (command === "list") {
  console.log("Showing note list");
  notes.getAll();
} else if (command === "read") {
  console.log("reading notes");
  notes.getNOte(argv.title);
} else if (command === "remove") {
  console.log("removing notes");
  notes.removeNote(argv.title);
} else {
  console.log("invalid command");
}
