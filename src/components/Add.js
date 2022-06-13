import {useState} from 'react'

const Add = (props) =>{

    let emptyGuide = {title: '', subject: '', category: '', author: '', length: 0, link: ''}
    const [guide, setGuide] = useState(emptyGuide)

    const handleChange = (event) =>{
        setGuide({...guide, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) =>{
        event.preventDefault()
        props.handleCreate(guide)
        setGuide(emptyGuide)
    }

    return (
        <>
            <details className='add'>
            <summary>Add Guide</summary>
                <form className='add-form' onSubmit={handleSubmit}>
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
                    <label><input className='submit-btn' type="submit"/></label>
                </form>
            </details>
        </>
    )
}

export default Add