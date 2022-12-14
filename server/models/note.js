const mongoose = require('mongoose')

const url = 'mongodb://mongo:27017/testGoose' //process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


const fileSchema = new mongoose.Schema({
  filename: String
})

const File = mongoose.model('File', fileSchema)

const noteSchema = new mongoose.Schema({
  header: String,
  content: String,
  date: Date,
  modified: Date,
  important: Boolean,
  files: [fileSchema]
})

module.exports = {
  Note: mongoose.model('Note', noteSchema),
  noteSchema: noteSchema,
  File: mongoose.model('File', fileSchema)
}


