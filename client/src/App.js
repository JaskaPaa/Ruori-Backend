
import React, { useState } from 'react';

import axios from 'axios'

import './App.css'



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
        const person = response.data
        //console.log(notes)
        console.log(person[0].notes[0].files[0])
        setNotes(JSON.stringify(person, null, 4))
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
      <pre>{notes}</pre>
    </div>
  )
}

const App = () => {  

  return (
    <div>
      <h1>Ruori testaus</h1>
      <Notes />
      <br />
      <Files />
    </div>
  )
}


const Files = () => {
    
  return (
    <div>
      <UploadFile />
      <DownloadFile filename={'test.txt'} />
    </div>
  )  
}

const UploadFile = () => {

  function uploadFile(e) {
    const data = new FormData() ;
    data.append('sampleFile', e.target.files[0]);
    axios.post("http://localhost:5000/upload", data)
        .then(res => { // then print response status
          console.log(res.statusText)
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  return (
    <span>
    {/*
    <form // ref='uploadForm' 
        id='uploadForm' 
        action='http://localhost:5000/upload' 
        method='post' 
        encType="multipart/form-data">
          <input type="file" name="sampleFile" />
          <input type='submit' value='Upload!' />
    </form>
    */}
    <input className="custom-file-input" type="file" onChange={uploadFile} />
    </span>
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
    <button onClick={handleSubmit}>Lataa: {filename}</button>
  )

}

export default App;
