import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import udai from '../assets/Maldives.jpg';
import image from '../assets/Udaipur.jpg';
import background from '../assets/europe.jpg';

interface MediaItem {
  type: 'image' | 'video';
  src: string;
  alt?: string;
}

const FullScreenCarousel: React.FC = () => {
  const mediaItems: MediaItem[] = [
    {
      type: 'image',
      src: background,
      alt: 'Europe',
    },
    {
      type: 'image',
      src: image,
      alt: 'Udaipur',
    },
    {
      type: 'image',
      src: udai,
      alt: 'Maldives',
    },
  ];

  return (
    <Carousel fade controls indicators interval={1100}>
      {mediaItems.map((item, index) => (
        <Carousel.Item key={index}>
          {item.type === 'image' ? (
            <img
              className="d-block w-100"
              src={item.src}
              alt={item.alt || `Slide ${index + 1}`}
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
            <h5>{item.alt || `Slide ${index + 1}`}</h5>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default FullScreenCarousel;
