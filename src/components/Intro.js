import {useState} from 'react'
import HeroSlider from './Carousel'

const Intro = (props) => {

    const [guides, setGuides] = useState([])

    return (
        <>
            <div className='intro-div'>
                <h3>Welcome to HandyHome -- you're one stop shop for all home fixes, improvements, and more!</h3>
                <h4>Feel free to browse, or go ahead and create and account to add, edit, or remove guides</h4>
            </div>
        </>
    )
}

export default Intro