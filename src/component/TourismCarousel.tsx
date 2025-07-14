import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import Honeymoon from './Honeymoon';
import axiosInstance from '../api/axiosInstance'; // ✅ Authenticated Axios

// Imported images
import Maldives from '../assets/Maldives.jpg';
import Jaipur from '../assets/Jaipur.jpg';
import Bali from '../assets/Bali.jpg';
import Italy from '../assets/Italy.jpg';
import Ladakh from '../assets/Ladakh.jpg';
import Kerala from '../assets/Kerala.jpg';
import Goa from '../assets/Goa.jpg';
import Kashmir from "../assets/imad-clicks-DsST40JDEoc-unsplash.jpg";

interface TourismPackage {
  packageID: number;
  name: string;
  price: string;
  image?: string;
}

const staticImages = [
  Maldives,
  Kashmir,
  Italy,
  Bali,
  Jaipur,
  Goa,
  Ladakh,
  Kerala,
];

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
        const limited = response.data.slice(0, 8); // ✅ Limit to 8 packages
        setTourismPackages(limited);
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

  const combinedPackages = tourismPackages.map((pkg, index) => ({
    ...pkg,
    image: staticImages[index % staticImages.length],
  }));

  const slides = chunkArray(combinedPackages, 4);

  return (
    <>
      <div className="container py-4">
        <div className="col-md-6 text-md-start text-center">
          <br /><br />
          <h2 className="fw-bold">Deals You Can't Miss</h2>
          <p className="text-muted mb-4">
            <b><em>Travel beyond boundaries with incredible savings</em></b>
          </p>
        </div>

        <Carousel controls indicators={false} interval={3000}>
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
        <h4>Experience the Soul of India in the Heartland of Madhya Pradesh!</h4>
        <button className="btn btn-warning mt-3 fw-bold px-4 rounded-pill">Know More</button>
      </div>

      <br />
      <Honeymoon />
      <br />
    </>
  );
};

export default TourismCarousel;
