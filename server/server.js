const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path');
const multer = require('multer');
const fs = require('fs')
const fileUpload = require('express-fileupload')

const app = express()

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())

app.use(express.json())

const { routes, updateMongo } = require('./mongo')


app.use('/api', routes)

// default options
app.use(fileUpload());

app.post('/upload', function (req, res) {
  let sampleFile;
  let uploadPath;

  console.log(req);

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is 
  // used to retrieve the uploaded file

  updateMongo(req.files.sampleFile)

  res.send('!!File uploaded!!');
})

app.get('/', (req, res) => {
  res.send('Ruori-palvelin...')
})

// The folder path for the files
const folderPath = __dirname + '/uploads/';

// GET request for single file
app.get('/single/:filename', (req, res, next) => {
  console.log('single file: ' + req.params.filename);
  let filename = req.params.filename.replace('_', '.');

  //res.set({'filename': filename})

  // Download function provided by express    
  res.download(folderPath + filename, function (err) {
    if (err) {
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


