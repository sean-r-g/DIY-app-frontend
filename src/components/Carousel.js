import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Carousel } from "react-bootstrap";


const HeroSlider = (props) => {

  let length = 0;

  const getNumberLength = (guides) => {
    length = guides.number;
  };

  // boostrap
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, event) => {
    setIndex(selectedIndex);
  };
  return (
    <Carousel id='carousel' activeIndex={index} onSelect={handleSelect}>
      {props.guides.map((guides, index) => {
        {
          getNumberLength(guides);
        }
        return (
          <Carousel.Item key={guides.id}>
            <div className='carousel-card'>
              <h2 className="center-text display-4" id='slide-title'>
                {guides.title}
              </h2>
              <iframe className='slides-iframe' src={guides.link}></iframe>
            </div>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};
export default HeroSlider;