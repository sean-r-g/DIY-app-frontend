import {useState} from 'react'
import HeroSlider from './Carousel'

const Intro = (props) => {

    const [guides, setGuides] = useState([])

    return (
        <>
            <HeroSlider guides={guides}/>
        </>
    )
}

export default Intro