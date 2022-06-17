import {useState} from 'react'
import HeroSlider from './Carousel'

const Intro = (props) => {

    const [guides, setGuides] = useState([])

    return (
        <>
            <div className='intro-div'>
                <h3>Intro....</h3>
                <h4>More words.....</h4>
            </div>
        </>
    )
}

export default Intro