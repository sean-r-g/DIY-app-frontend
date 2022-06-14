import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'
import Add from './components/Add'
import Edit from './components/Edit'
// import Intro from './components/Intro'
import HeroSlider from './components/Carousel'

function App() {

  const [guides, setGuides] = useState([])
  const [showAbout, setShowAbout] = useState(true)
  const [showAll, setShowAll] = useState(false)

//////CRUD Functions///////////
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

  //////Display Toggles///////

  const toggleAbout = () => {
    setShowAbout(true)
    setShowAll(false)
  }

  const toggleShowAll = () => {
    setShowAll(true)
    setShowAbout(false)
  }



  useEffect(()=>{
    getGuides()
  }, [])


  return (
    <div className='main-div'>
      <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500&display=swap" rel="stylesheet"></link>
      <h1>[Working Title....]</h1>
      <div id='top-btns'>
        <button onClick={toggleAbout}>About</button>
        <button onClick={toggleShowAll}>All Guides</button>
      </div>
      <Add handleCreate={handleCreate}/>
      {showAbout ? <HeroSlider guides={guides}/> : null}
     {showAll ? <div className='guides-container'>
        {guides.map((guide)=>{
          return (
            <div className='guide-card'>
              <h3><a href={guide.link}>{guide.title}</a></h3>
              <iframe className='video' src={guide.link} title={guide.title}></iframe>
              <p>Subject: {guide.subject}</p>
              <p>Category: {guide.category}</p>
              <p>Creator: {guide.author}</p>
              <p>Length: {guide.length} min</p>
              <Edit handleUpdate={handleUpdate} handleDelete={handleDelete} guide={guide}/>
            </div>
          )
        })}
      </div> : null }
    </div>
  );
}

export default App;
