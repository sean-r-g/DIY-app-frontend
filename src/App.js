import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'
import Add from './components/Add'
import Edit from './components/Edit'
// import Intro from './components/Intro'
import HeroSlider from './components/Carousel'
import AddModal from './components/AddModal'

function App() {

  const [guides, setGuides] = useState([])
  const [showAbout, setShowAbout] = useState(true)
  const [showAll, setShowAll] = useState(false)
  const [searchInput, setSearchInput] = useState('')
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

  ////Display Filter/////////
  const filterByCategory = (event) => {
    setGuides(guides.filter(guide => guide.category == event.target.value))
  }
  const clearFilter = () => {
    getGuides()
  }
  

  const handleChange = (event) => {
      // event.preventDefault()
      setSearchInput(event.target.value)
      if (searchInput.length > 0) {
        setGuides(guides.filter(guide => guide.title.toLowerCase().includes(searchInput.toLowerCase())))
    } else {
      getGuides()
    }
  }



  useEffect(()=>{
    getGuides()
  }, [])


  return (
    <div className='main-div'>
      <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500&display=swap" rel="stylesheet"></link>
      <header>  
      <img id='logo' src='https://i.imgur.com/6CBFHun.png'/>
      <div id='top-btns'>
        <button onClick={toggleAbout}>About</button>
        <button onClick={toggleShowAll}>All Guides</button>
        <AddModal handleCreate={handleCreate}/>
      </div>
      </header>
      {/* <Add handleCreate={handleCreate}/> */}
      {showAbout ? <HeroSlider guides={guides}/> : null}
      {showAll ? <div className='cat-btns'>
        <form>
            <input placeholder='Search Guides' onChange={handleChange} value={searchInput}/>
        </form>
        <details id='filter-menu'>
        <summary><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAADfElEQVRoge2aT2gcVRzHP7/dxLAGI2KxscmCIlJR8FSqmH9V3LQGKyKloCCKFArqQfRa0aNexCLoxYMiKFToodSo8eJmXgKW5qK0KKWonZk01UohNcY02f162N2a7p+s2cxuprKfy+PNe+/3+3737Zt5jxloEy9sdUWB84DBTdKyXpz1Dw6VKomyxuvFBJRp7ajWw/oHrdr1uKDAqfxa+YwUO353a/PlNEYtbeVGZgrFlXH97m5qsqZ1U9B0ZbxYnVnddq2RDhsDfgLbyRJfau7r7hZprIv86RRLHAPbCZxlJb93dfs1Rqx34DcslwF+BQZY7j6qM+NdLdRbFZ082YnpCLALCOnIZeyO4fOr+1SsEesb8VEuA1zAGCXV86l0JNkizRVISrB16WPQ48BFkvlR6x35ubxf1cVu6ZEzKD8KXAKeItz2oaSW38kkGeHU+5ieRsyT0B67ffh0tb5VjQBYevh7YAz4E3ieWfduk/TWJnBvAQeBRWR7bdvQTL0hNVHoParA/a3ASYF3KDKR9fIG7vVCTrck341FE3R28kkFbrlo5rVIgq6VL/ReKppYUeD2Rxs88J5V4HIKXF6+OxBp8FbnaeovRYtnvin/XTZpLcr33i6a+UvnpoY3HC9wDypwlxU4KfQONxKjoWdD8f7+AXAQMU9SjzR6a5Q/eT+W+Ba4BfiIvoEXzKxid1uPms+RtTAz0TfwIrLPMHrI21c6P3nveuPIz96NJSYomDhK3+yBRkxAg0YAzCzPha7nwI4DW8glJjSXvfO/jleYTWPJb4CtiAkW558x259rWE+jA68K8qdTWH6cwobuLCv5ofINXcWYuanbWNEksB2YomNht/XuXtiIjoZnpISlH1qkiydAJ4C76Ewcqzsopy+A7aATdPHYRk1ABDNSonByW74I9Y/K/x5VO7dY/wN/RJF/wzNSohFBUZmACI1sNm0jcaNtJG60jcSNtpG40TYSN9pG4kbbSNxoihGFLtOMuGsRsRFNFwomFHifK8ymo41fm2iNzKV2Ib0CXAbbh5I/yvfebMVbr0iN2I4dy5YeOkyee8A+AW7E7A1SN/8g39sTZa6K3M0MrsA9jPEe4r5iuuMkeJm8foFo3+c3/XWaTp26gZ5Lr2IcArqBhWJ5fRkpoTCbRol3wPZdTR7zLyzWRKHLKPBOFz/gafO/5R95bZ+BwA/shAAAAABJRU5ErkJggg=="/></summary>
          <button  id='clear-filter' onClick={clearFilter}>Clear Filter</button>
          <button onClick={(event) => {filterByCategory(event)}} value='Home'>Home</button>
          <button onClick={(event) => {filterByCategory(event)}}value='Outdoor'>Outdoor</button>
          <button onClick={(event) => {filterByCategory(event)}} value='Auto'>Auto</button>
          <button onClick={(event) => {filterByCategory(event)}} value='Crafts'>Crafts</button>
          <button onClick={(event) => {filterByCategory(event)}} value='Cooking'>Cooking</button>
        </details>
       </div> : null}
     {showAll ? 
     <div className='guides-container'>
        {guides.map((guide)=>{
          return (
            <div className='guide-card' key={guide.id}>
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
