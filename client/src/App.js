
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

  const [downloadFile, setDownloadFile] = useState ('');

  function handleDownloadFile (e) {

    setDownloadFile(e.target.value.replace('.', '_'));
  }

  function handleSubmit(event) {
    event.preventDefault();
    
    // do something
    console.log("Form submitted");
    console.log("App  downloadFile: " + downloadFile);
    
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
        link.setAttribute('download', downloadFile.replace('_', '.'));
        document.body.appendChild(link);
        link.click();
        console.log('Downloaded file: ' + downloadFile.replace('_', '.'));
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
  }

  const DownloadFile = (props) => {

    //const downloadFile = props.filename
    const { filename } = props

    const [downloadFile, setDownloadFile] = useState ('');

    function handleDownloadFile (e) {
      setDownloadFile(e.target.value.replace('.', '_'));
    }

    console.log("----: " + filename)
    console.log("----: " + downloadFile)

    function handleSubmit(event) {
      event.preventDefault();
      
      // do something
      console.log("Form submitted");
      console.log(filename)
      console.log(downloadFile);
      console.log("Download's downloadFile: " + downloadFile);


      //let downloadFile2 = filename.replace('.', '_')
      let downloadFile2 = filename
      downloadFile2 = downloadFile2.replace('.', '_')

      console.log("Download's downloadFile2: " + downloadFile2 + '---');
      console.log(typeof downloadFile2);

      console.log(downloadFile2.valueOf() === 'test_txt');
      
      downloadFile2 = 'test_txt'
      console.log(typeof downloadFile2);

      console.log("Download's downloadFile2: " + downloadFile2  + '---');

      console.log(downloadFile2 === 'test_txt');

            
      axios({
        url: 'http://localhost:5000/single/' + downloadFile2,
        method:'GET',
        responseType: 'blob'
        })
        .then((response) => {
          const url = window.URL
            .createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          console.log("hahahahaha" + filename)
          link.setAttribute('download', filename);
          document.body.appendChild(link);
          link.click();
          //console.log('Downloaded file: ' + downloadFile.replace('_', '.'));
        })
        .catch((error) => {
          console.log(error.toJSON());
        });
    }

    return (
      <div>
      <form onSubmit={handleSubmit} >
        <input type="text" id="filename" name="filename" value={downloadFile} onChange={handleDownloadFile}/>
        <button type="submit">Download Single File</button>
      </form>
      <button onClick={handleSubmit}>Test Button</button>
      </div>
    )

  }

  return (
    <div>
      <h1>Ruori</h1>
      <Notes />
      <br />
      <form // ref='uploadForm' 
        id='uploadForm' 
        action='http://localhost:5000/upload' 
        method='post' 
        encType="multipart/form-data">
          <input type="file" name="sampleFile" />
          <input type='submit' value='Upload!' />
      </form>
      <br />
      <br />
      <form onSubmit={handleSubmit} >
        <input type="text" id="filename" name="filename" value={downloadFile} onChange={handleDownloadFile} />
        <button type="submit">Download Single File</button>
      </form>
      <DownloadFile filename={'text_txt'} />
    </div>
  )
}

export default App;
