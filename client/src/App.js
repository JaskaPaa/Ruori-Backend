
import React, {useState} from 'react';

import axios from 'axios'

const Notes = () => {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('Testi testi')

  fetch("http://localhost:5000")
    .then(res => res.text())
    .then(res => console.log(res))
    .catch(err => err);
  
  axios
    .get('http://localhost:5000/notes')
    .then(response => {
      const notes = response.data
      console.log(notes)
    })
  
  const getAll = () => {
    console.log("Haetaa dataa...")
    axios
      .get('http://localhost:5000/notes')
      .then(response => {
        const notes = response.data
        console.log(notes)
        setNotes(JSON.stringify(notes))
      })
  }

  return (
    <div>
      <div>
        <button onClick={() => getAll()}>
          Hae
        </button>
      </div>
      <p>Turha</p>
      <p>{notes}</p>
    </div>
  )
}

const Upload = () => {
  const [uploadedFile, setUploadedFile] = useState ('');
  const [fileTitle, setFileTitle] = useState ('');

  function handleFormSubmittion (e) {
    e.preventDefault ();

    let form = document.getElementById ('form');
    let formData = new FormData (form);

    // do something
    console.log("Form submitted");
    axios.post ('http://localhost:5000/upload', formData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  function handleFileTitle (e) {
    setFileTitle (e.target.value);
  }

  function handleUploadedFile (e) {
    setUploadedFile (e.target.value);
  }

  return (
    <React.Fragment>
      <h1>File upload</h1>
      <form
        encType="multipart/form-data"
        onSubmit={handleFormSubmittion}
        id="form"
        name="foo"
      >
        <input
          type="file"
          name="uploadedFile"
          value={uploadedFile}
          onChange={handleUploadedFile}
          required
        />
        <br />
        <br />

        <label>File title:</label><br />
        <input
          type="text"
          placeholder="Enter file title"
          name="fileTitle"
          value={fileTitle}
          onChange={handleFileTitle}
          required
        />
        <br />
        <br />

        <button type="submit">Submit Form</button>
      </form>      
    </React.Fragment>
  );
}



const App = () => {

  function handleSubmit(event) {
    alert('A name was submitted: ');
    event.preventDefault(); 
    

    // do something
    console.log("Form submitted");
    axios.get ('http://localhost:5000/single')
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      <h1>Ruori</h1>
      <Notes />
      <Upload />
      <br />
      <form onSubmit={handleSubmit} >
        <button type="submit">Download Single File</button>
      </form>
    </div>
  )
}

export default App;
