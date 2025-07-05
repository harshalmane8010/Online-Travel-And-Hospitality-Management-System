import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import udai from './assets/Maldives.jpg';
import image from './assets/Udaipur.jpg';
import background from './assets/europe.jpg';



const FullScreenCarousel = () => {
  const mediaItems = [
    {
      type: 'image',
      src: background,
      
    },
    {
      type: 'image',
      src: image,
      
    },
    {
      type: 'image',
      src: udai,
      
    },
   
  ];

  return (
    <Carousel fade controls indicators interval={1500}>
      {mediaItems.map((item, index) => (
        <Carousel.Item key={index}>
          {item.type === 'image' ? (
            <img
              className="d-block w-100"
              src={item.src}
              alt={item.alt}
              style={{ height: '50vh', objectFit: 'cover' }}
            />
          ) : (
            <video
              className="d-block w-100"
              src={item.src}
              autoPlay
              muted
              loop
              style={{ height: '50vh', objectFit: 'cover' }}
            />
          )}
          <Carousel.Caption>
            <h5>{item.alt}</h5>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
    
  );
};

export default FullScreenCarousel;
