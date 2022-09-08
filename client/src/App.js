import { useState } from 'react'

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
      <p>Jotain lisää...</p>
      <p>Jotain lisää...</p>
      <p>Jotain muuta...</p>
      <p>Jotain toista...</p>
      <p>Blaa blaaa</p>
      <p>{notes}</p>
    </div>
  )
}

const App = () => {
  return (
    <div>
      <h1>Ruori</h1>
      <Notes />
      <Notes />
      <Notes />
    </div>
  )
}

export default App;
