import {useState} from 'react'

const Edit = (props) =>{

    let emptyGuide = {title: '', subject: '', category: '', author: '', length: 0, link: ''}
    const [guide, setGuide] = useState({...props.guide})

    const handleChange = (event) =>{
        setGuide({...guide, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) =>{
        event.preventDefault()
        props.handleUpdate(guide)
    }

    return (
        <details className='edit'>
        <summary><img id='edit-icon' src="https://img.icons8.com/ios/50/undefined/edit--v1.png"/></summary>
            <form className='edit-form' onSubmit={handleSubmit}>
                <label htmlFor="title">Title:
                <input type="text" name="title" value={guide.title} onChange={handleChange} />  </label>
                <br/>
                <label htmlFor="subject">Subject: 
                <input type="text" name="subject" value={guide.subject} onChange={handleChange} /></label>
                <br/>
                <label htmlFor="category">Category:
                <input type="text" name="category" value={guide.category} onChange={handleChange} /> </label>
                <br/>
                <label htmlFor="author">Author: 
                <input type="text" name="author" value={guide.author} onChange={handleChange}/></label>
                <br/>
                <label htmlFor="length">Length: 
                <input type="number" name="length" value={guide.length} onChange={handleChange} /></label>
                <br/>
                <label htmlFor="link">Link: 
                <input type="url" name="link" value={guide.link} onChange={handleChange} /></label>
                <br/>
                <input className='submit-btn' type="submit" value='Save Changes'/>
                </form>
                <br/>
                <button className='submit-btn' onClick={(event) =>{props.handleDelete(event, guide)}} value={guide.id}>Remove</button>
        </details>
    )
}

export default Edit