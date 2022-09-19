const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

const { Note, File } = require('./models/note')

const { Person } = require('./models/person')

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


/*person.save()
  .then(result => {
    console.log('person saved!')
  })
  .catch(err => console.log('pieleen meni'))
*/


router.get('/notes', (req, res) => {
    console.log('Getting the notes...')
  
    Person.find({}).then(notes => {
      notes.forEach(note => {
        console.log(note)
      })
      res.json(notes)
    })
  })
  
router.post('/new_note', (request, response) => {

    const body = request.body
    //console.log(body)  

    let id = '63205d9594631cb634a7180a';
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
        person.save().then(savedPer => {
            response.json(savedPer)
        });
        }
    });

})
  
router.post('/update_note', (request, response) => {
    
    const body = request.body
  
    console.log(body.person_id)  
  
    let id = '63205d9594631cb634a7180a';
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
  
router.delete('/delete_note', (request, response) => {
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

function toMongo(file) {

    console.log('blaaaaa');

    const id = "6328710d0115f011d80159c2"
    const note_id = "6328710d0115f011d80159c3"

    Person.findById(id, function (err, person) {
        if (err){
            console.log(err);
        }
        else {
            //console.log("Notes : ", person.notes);
            const note = person.notes.id(note_id);
            //console.log("Note: " + note);
            if (note) {          
              note.files.push({filename: file})
              person.save().then(savedNote => {
                console.log('Saved filename!')
              });
            } else {
                console.log('Note not found')
            }       
        }
      }); 
}

module.exports = {
    routes: router,
    test: toMongo
}

