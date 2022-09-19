
import React, { useState } from 'react';

import axios from 'axios'

const Notes = () => {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('Testi testi')

  const base = 'http://localhost:5000/api'

  /*
  fetch(base)
    .then(res => res.text())
    .then(res => console.log(res))
    .catch(err => err);
  */
  
  axios
    .get(base + '/notes')
    .then(response => {
      const notes = response.data
      console.log(notes)
    })
  
  const getAll = () => {
    console.log("Haetaa dataa...")
    axios
      .get(base + '/notes')
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




const App = () => {  

  return (
    <div>
      <h1>Ruori</h1>
      <Notes />
      <br />
      <UploadFile />
      <br />
      <br />
      <DownloadFile filename={'test.txt'} />
    </div>
  )
}

const UploadFile = () => {

  return (
    <form // ref='uploadForm' 
        id='uploadForm' 
        action='http://localhost:5000/upload' 
        method='post' 
        encType="multipart/form-data">
          <input type="file" name="sampleFile" />
          <input type='submit' value='Upload!' />
    </form>
  ) 
}

const DownloadFile = (props) => {

  const { filename } = props  

  function handleSubmit(event) {
    event.preventDefault();

    //let downloadFile2 = filename.replace('.', '_')
    let downloadFile = filename
    downloadFile = downloadFile.replace('.', '_')
          
    axios({
      url: 'http://localhost:5000/single/' + downloadFile,
      method:'GET',
      responseType: 'blob'
      })
      .then((response) => {
        const url = window.URL
          .createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
  }

  return (
    <div>
    <button onClick={handleSubmit}>Lataa: {filename}</button>
    </div>
  )

}

export default App;
