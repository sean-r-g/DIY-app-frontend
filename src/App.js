import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'
import Add from './components/Add'
import Edit from './components/Edit'

function App() {

  const [guides, setGuides] = useState([])

  const getGuides = () => {
    axios.get('http://localhost:8000/guides').then((response)=>{
      setGuides(response.data)
    })
  }

  const handleCreate = (addGuide) => {
    axios.post('http://localhost:8000/guides', addGuide).then((response)=>{
      getGuides()
    })
  }

  const handleDelete = (event, deletedGuide) =>{
    axios.delete(`http://localhost:8000/guides/${event.target.value}`).then((response)=>{
      setGuides(guides.filter(guide => guide.id !== deletedGuide.id))
    })
  }

  const handleUpdate = (editGuide) =>{
    axios.put(`http://localhost:8000/guides/${editGuide.id}`, editGuide).then((response)=>{
      getGuides()
    })
  }

  useEffect(()=>{
    getGuides()
  }, [])


  return (
    <>
      <h1>[Working Title....]</h1>
      <Add handleCreate={handleCreate}/>
      <div className='guides-container'>
        {guides.map((guide)=>{
          return (
            <div className='guide-card'>
              <h4><a href={guide.link}>{guide.title}</a></h4>
              <h5>Subject: {guide.subject}</h5>
              <h5>Category: {guide.category}</h5>
              <h5>Creator: {guide.author}</h5>
              <h5>Length: {guide.length} min</h5>
              <iframe className='video' src={guide.link} title={guide.title}></iframe>
              <br/>
              <Edit handleUpdate={handleUpdate} handleDelete={handleDelete} guide={guide}/>
              <br/>
            </div>
          )
        })}
      </div>
    </>
  );
}

export default App;
