const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

app.use(express.json())

const mongoose = require('mongoose');
const { response } = require('express')

main()
  .then(res => console.log("!! Mongoose connection !!"))
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://mongo:27017/testGoose');
}

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const personSchema = new mongoose.Schema({
  name: String,
  notes: [noteSchema]  
});


const Note = mongoose.model('Note', noteSchema)

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: "Aku Ankka",
  notes: [{
    content: 'Aku aloitti',
    date: new Date('2022-06-17T03:24:00'),
    important: true
  }]
})

const note = [
  new Note({
    content: 'Asiakas aloitti',
    date: new Date('2022-08-17T03:24:00'),
    important: true
  }),
  new Note({
    content: 'Asiakas heitti homman kesken',
    date: new Date(),
    important: true
})];

note[0].save()
  .then(result => {
    console.log('note saved!')
  })
  .catch(err => console.log('pieleen meni'))

note[1].save()
  .then(result => {
    console.log('note saved!')
  })
  .catch(err => console.log('pieleen meni'))

person.save()
  .then(result => {
    console.log('person saved!')
  })
  .catch(err => console.log('pieleen meni'))


app.get('/', (req, res) => {
    res.send('Ruori-palvelin...')
})

app.get('/notes', (req, res) => {
  console.log('Getting the notes...')

  Person.find({}).then(notes => {
    notes.forEach(note => {
      console.log(note)
    })
    res.json(notes)
  })
  /*
  Note.find({}).then(notes => {
    notes.forEach(note => {
      console.log(note)
    })
    res.json(notes)
  })*/
})

const PORT = 5000;
const HOST = '0.0.0.0';

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


