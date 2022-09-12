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
  header: String,
  content: String,
  date: Date,
  modified: Date,
  important: Boolean
})

const personSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  notes: [noteSchema]  
});

const Note = mongoose.model('Note', noteSchema)

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: "Aku Ankka",
  email: "aku313@gmail.com",
  phone: "030 313 1313",
  notes: [{
    content: 'Aku Ankka aloitti',
    date: new Date('2022-06-17T03:24:00'),
    important: true
  }]
})

/*
person.save()
  .then(result => {
    console.log('person saved!')
  })
  .catch(err => console.log('pieleen meni'))
*/

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
})

app.post('/new_note', (request, response) => {
  
  const body = request.body

  //console.log(body)  

  let id = '631ef5229af0af48284fb6c3';
  Person.findById(id, (err, person) => {
    if (err){
      console.log(err);
    }
    else {
      console.log("Result : ", person);
      person.notes.push(new Note({
        header: body.header,
        content: body.new_note,
        date: new Date(),
        important: true
      }));
      person.save().then(savedNote => {
        response.json(savedNote)
      });
    }
  });

})

app.post('/update_note', (request, response) => {
  
  const body = request.body

  console.log(body.person_id)  

  let id = '631ef5229af0af48284fb6c3';
  Person.findById(id, function (err, person) {
    if (err) {
        console.log(err);
    }
    else {
      const note = person.notes.id(body.note_id);
      console.log("Note: " + note);
      if (note) {          
        note.content = body.updated_note;
        note.header = body.updated_header;
        note.modified = new Date();
        person.save().then(savedNote => {
          response.json(savedNote)
        });
      } else {
        response.json("Note does not exist!")
      }        
    }
  });

})

app.delete('/delete_note', (request, response) => {
  const body = request.body;

  console.log(body);
  //Note.deleteOne({ _id: body.note_id });

  let id = '631ef5229af0af48284fb6c3';
  Person.findById(id, function (err, person) {
    if (err){
        console.log(err);
    }
    else {
        //console.log("Notes : ", person.notes);
        const note = person.notes.id(body.note_id);
        //console.log("Note: " + note);
        if (note) {          
          note.remove();
          person.save().then(savedNote => {
            response.json(savedNote)
          });
        } else {
          response.json("Note does not exist!")
        }       
    }
  });  
})

const PORT = 5000;
const HOST = '0.0.0.0';

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


