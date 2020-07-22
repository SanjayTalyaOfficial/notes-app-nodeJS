// const fs = require('fs')
// // const book = {
// //     title: 'Ego is the enemy',
// //     author: 'Ryan Holiday'
// // }

// // const bookJSON = JSON.stringify(book)
// // fs.writeFileSync('1-json.json', bookJSON)

// const dataBuffer = fs.readFileSync('1-json.json') //Buffer is a way to store binary value
// const dataJSON = dataBuffer.toString()
// const data = JSON.parse(dataJSON)
// console.log(data.title)

////////////////////---Challenge---////////////////////////

// Load and parse the JSON Data
const fs = require('fs')
const dataBuffer = fs.readFileSync('1-json.json')
const dataJSON = dataBuffer.toString()
const user = JSON.parse(dataJSON)

// change name and age property using info
user.name = "Sanjay"
user.age = 24

// Stringify the changed object and overwrite the original data
const userJSON = JSON.stringify(user)
fs.writeFileSync('1-json.json', userJSON)



