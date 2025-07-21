import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import Honeymoon from './Honeymoon';
import axiosInstance from '../api/axiosInstance';

import Europe from '../assets/europe.jpg';
import Bali from '../assets/Bali.jpg';
import Maldives from '../assets/Maldives.jpg';
import Kashmir from '../assets/kashmir.png';
import Thailand from '../assets/thiland.png';
import Mauritius from '../assets/Mauritius.jpg';
import Singapore from '../assets/Italy.jpg';
import Kerala from '../assets/kerala.jpg';

interface TourismPackage {
  packageID: number;
  name: string;
  price: string;
  image?: string;
}

const imageMap: { [key: string]: string } = {
  'Europe Grand Tour': Europe,
  'Bali Bliss': Bali,
  'Maldives Escape': Maldives,
  'Kashmir Serenity': Kashmir,
  'Thailand Tropical Tour': Thailand,
  'Mauritius Romance': Mauritius,
  'Singapore Romantic Escape': Singapore,
  'Kerala Backwater Retreat': Kerala,
};

const chunkArray = <T,>(arr: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

const TourismCarousel: React.FC = () => {
  const [tourismPackages, setTourismPackages] = useState<TourismPackage[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get('/api/packages')
      .then(response => {
        const validNames = Object.keys(imageMap).map(name => name.toLowerCase());

        const filtered = response.data
          .filter((pkg: TourismPackage) =>
            validNames.includes(pkg.name.trim().toLowerCase())
          )
          .map((pkg: TourismPackage) => ({
            ...pkg,
            image: imageMap[pkg.name.trim()] || '/default.jpg',
          }));

        setTourismPackages(filtered);
      })
      .catch(error => {
        console.error('Error fetching packages:', error);
        if (
          typeof error === 'object' &&
          error !== null &&
          'response' in error &&
          (error as any).response?.status === 401
        ) {
          alert('Session expired. Please log in again.');
          navigate('/login');
        }
      });
  }, [navigate]);

  const slides = chunkArray(tourismPackages, 4);

  return (
    <>
      <div className="container py-4">
        <div className="col-md-6 text-md-start text-center">
          <br /><br />
          <h2 className="headingb fw-bold">Deals You Can't Miss</h2>
          <p className="text-muted mb-4">
            <b><em>Travel beyond boundaries with incredible savings</em></b>
          </p>
        </div>

        <Carousel controls indicators={false} interval={1000}>
          {slides.map((group, slideIndex) => (
            <Carousel.Item key={slideIndex}>
              <div className="d-flex justify-content-center gap-4 flex-wrap">
                {group.map((pkg, idx) => (
                  <div key={idx} className="package-card shadow-sm">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="package-img"
                    />
                    <div className="package-info">
                      <h5>{pkg.name}</h5>
                      <p className="price">From <strong>{pkg.price}</strong></p>
                      <button
                        className="explore-link btn btn-outline-primary btn-sm mt-2"
                        onClick={() =>
                          navigate('/package-details', { state: { pkg } })
                        }
                      >
                        Explore →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      <div className="banner p-4 mt-5 text-white">
        <h4>Your Journey Begins Here - Explore the World with Us!</h4>
        <button className="btn btn-warning mt-3 fw-bold px-4 rounded-pill" onClick={() => navigate('/explore')}>
          Explore More
        </button>
      </div>

      <br />
      <Honeymoon />
      <br />
    </>
  );
};

export default TourismCarousel;
