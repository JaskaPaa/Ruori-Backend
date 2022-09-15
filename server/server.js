const express = require('express')
const bodyParser = require ('body-parser')
const cors = require('cors')
const path = require ('path');
const multer = require ('multer');
const fs = require('fs')

const app = express()

// middleware
app.use (bodyParser.json ());
app.use (bodyParser.urlencoded ({extended: true}));

app.use(cors())

app.use(express.json())

const mongo = require('./mongo')

app.use('/api', mongo)


app.get('/', (req, res) => {
    res.send('Ruori-palvelin...')
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
const folderPath = __dirname + '/public/uploads';
 
// GET request for single file
app.get('/single/:filename', (req, res, next) => {
    console.log('single file: ' + req.params.filename);
    let filename = req.params.filename.replace('_', '.');

    //res.set({'filename': filename})

    // Download function provided by express    
    res.download(folderPath+'/uploadedFile-' + filename, function(err) {
        if(err) {
            console.log(err);
            next(err)
        }
    })
})

const PORT = 5000;
const HOST = '0.0.0.0';

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


