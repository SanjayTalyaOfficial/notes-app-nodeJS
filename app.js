
let getNotes = require('./notes');
const chalk = require('chalk');
const yargs = require('yargs');

// customise yargs version 
yargs.version('1.1.0')

// we want the app to add, remove, read and list

// create a add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note description',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        console.log('Title: ' +argv.title)
        console.log('Description: '+argv.body)
    }
})

//create a remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    handler: function () {
        console.log('Removing a note!')
    }
})

// Create a list command
yargs.command({
    command: 'list',
    describe: 'Show the list of notes',
    handler: function () {
        console.log('There are the list of functions')
    }
})

// Create a read command
yargs.command({
    command: 'read',
    describe: 'read the note',
    handler: function () {
        console.log('Reading the notes')
    }
})
yargs.parse()

// console.log(yargs.argv)