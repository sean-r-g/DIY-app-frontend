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
            <details>
            <summary>Add Guide</summary>
                <form className='add' onSubmit={handleSubmit}>
                <label htmlFor="title">Title: </label>
                <input type="text" name="title" value={guide.title} onChange={handleChange} />
                <br/>
                <label htmlFor="subject">Subject: </label>
                <input type="text" name="subject" value={guide.subject} onChange={handleChange} />
                <br/>
                <label htmlFor="category">category: </label>
                <input type="text" name="category" value={guide.category} onChange={handleChange} />
                <br/>
                <label htmlFor="author">Author: </label>
                <input type="text" name="author" value={guide.author} onChange={handleChange}/>
                <br/>
                <label htmlFor="length">Length: </label>
                <input type="number" name="length" value={guide.length} onChange={handleChange} />
                <br/>
                <label htmlFor="link">Video Link: </label>
                <input type="url" name="link" value={guide.link} onChange={handleChange} />
                <br/>
                    <input type="submit"/>
                </form>
            </details>
        </>
    )
}

export default Add