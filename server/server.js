const express = require('express')
const bodyParser = require ('body-parser')
const cors = require('cors')
const path = require ('path');
const multer = require ('multer');


const app = express()

// middleware
app.use (bodyParser.json ());
app.use (bodyParser.urlencoded ({extended: true}));

app.use(cors())

app.use(express.json())


const { Note } = require('./models/note')

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
      person.save().then(savedNote => {
        response.json(savedNote)
      });
    }
  });

})

app.post('/update_note', (request, response) => {
  
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

const storageEngine = multer.diskStorage ({
  destination: './public/uploads/',
  filename: function (req, file, callback) {
    callback (
      null,
      file.fieldname + '-' + file.originalname
    );
  },
});

// file filter for multer
const fileFilter = (req, file, callback) => {
  let pattern = /jpg|png|svg|PNG|txt/; // reqex

  if (pattern.test (path.extname (file.originalname))) {
    callback (null, true);
  } else {
    callback ('Error: not a valid file');
  }
};

// initialize multer
const upload = multer ({
  storage: storageEngine,
  //fileFilter: fileFilter,
});

// routing
app.post ('/upload', upload.single('uploadedFile'), (req, res) => {
  console.log("Uploading (server)...")
  res.json(req.file).status(200);
});

// The folder path for the files
const folderPath = __dirname+'/public/uploads';
 
// GET request for single file
app.get('/single', function(req,res) {
    console.log('single file');
     
    // Download function provided by express
    res.download(folderPath+'/uploadedFile-test.txt', function(err) {
        if(err) {
            console.log(err);
        }
    })
})

const PORT = 5000;
const HOST = '0.0.0.0';

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


