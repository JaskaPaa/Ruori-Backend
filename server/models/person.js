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

const noteSchema = require('./note').noteSchema

const personSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    notes: [noteSchema]  
  });


module.exports = {
    Person: mongoose.model('Person', personSchema)
}


