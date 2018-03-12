const yargs = require('yargs');
const notes = require('./notes');

const titleOptions = { describe: 'title of note', demand: true, alias: 't' };
const bodyOptions = { describe: 'body of note', demand: true, alias: 'b' };
const argv = yargs
  .command('add', 'add a note', {
    title: titleOptions,
    body: bodyOptions
  })
  .command('list', 'list all notes')
  .command('read', 'read a note', {
    title: titleOptions
  })
  .command('remove', 'remove a note', {
    title: titleOptions
  })
  .help().argv;
const command = argv._[0];

if (command === 'add') {
  const note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log(`--> note: Added`);
    notes.logNotes(note);
  } else {
    console.log('note title taken');
  }
} else if (command === 'list') {
  const noteList = notes.getAll();
  if (noteList) {
    noteList.forEach(element => {
      notes.logNotes(element);
    });
  } else {
    console.log('Note not found');
  }
} else if (command === 'read') {
  const note = notes.getNote(argv.title);
  if (note) {
    note.forEach(element => {
      notes.logNotes(element);
    });
  } else {
    console.log('note not Found..!');
  }
} else if (command === 'remove') {
  const noteRemoved = notes.removeNote(argv.title);
  if (noteRemoved) {
    console.log(`note removed successfully...`);
  } else {
    console.log('note not Found...!');
  }
} else {
  console.log('invalid command...');
}
