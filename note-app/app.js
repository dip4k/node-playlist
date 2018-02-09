const argv = require("yargs").argv;
const notes = require("./notes");

var command = argv._[0];
console.log(command);

if (command === "add") {
  let note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log(`--> note: Added \ntitle: ${note.title} body: ${note.body}`);
  } else {
    console.log("note title taken");
  }
} else if (command === "list") {
  let noteList = notes.getAll();
  if (noteList) {
    for (const item of noteList) {
      console.log(`title: ${item.title}  body: ${item.body}`);
    }
  } else {
    console.log("Note not found");
  }
} else if (command === "read") {
  let note = notes.getNOte(argv.title);
  if (note) {
    for (const item of note) {
      console.log(`title: ${item.title}  body: ${item.body}`);
    }
  } else {
    console.log("note not Found..!");
  }
} else if (command === "remove") {
  let noteRemoved = notes.removeNote(argv.title);
  if (noteRemoved) {
    console.log(`note removed`);
  } else {
    console.log("note not Found");
  }
} else {
  console.log("invalid command");
}
