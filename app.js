// const add = require('./utils');  //we are exporting the name from utils.js
// const sum = add(3,4);
// console.log(sum);

let getNotes = require('./notes');
const note = getNotes('morning this is my first msg');
console.log(note);