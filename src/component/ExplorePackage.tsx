import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Explorepackage.css';

import Maldives from '../assets/Maldives.jpg';
import Jaipur from '../assets/Jaipur.jpg';
import Bali from '../assets/Bali.jpg';
import Italy from '../assets/Italy.jpg';
import Ladakh from '../assets/Ladakh.jpg';
import Kerala from '../assets/Kerala.jpg';
import Goa from '../assets/Goa.jpg';
import Kashmir from "../assets/imad-clicks-DsST40JDEoc-unsplash.jpg";
import TopBanner from '../assets/explorebg.jpg';

import axiosInstance from '../api/axiosInstance'; // ✅ secure Axios

interface Package {
  packageID: number;
  name: string;
  startDate: string;
  endDate: string;
  price: string;
  flights?: string;
  hotels?: string;
  itinerary?: string[];
  image?: string;
}

const ExplorePackage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [packages, setPackages] = useState<Package[]>([]);
  const [filteredPackages, setFilteredPackages] = useState<Package[]>([]);

  const imageMap: { [key: string]: string } = {
    'Maldives Escape': Maldives,
    'The Pink City Jaipur': Jaipur,
    'Bali Bliss': Bali,
    'Europe Grand Tour': Italy,
    'Mauritius Romance': Ladakh,
    'Kerala Backwater Retreat': Kerala,
    'Thailand Tropical Tour': Goa,
    'Kashmir Serenity': Kashmir,
  };

  useEffect(() => {
    axiosInstance.get('/api/packages')
      .then(response => {
        const enriched = response.data.map((pkg: Package) => ({
          ...pkg,
          image: imageMap[pkg.name] || Maldives,
        }));

        setPackages(enriched);

        const query = location.state?.searchQuery?.toLowerCase();
        if (query) {
          const filtered = enriched.filter((pkg: Package) =>
            pkg.name.toLowerCase().includes(query)
          );
          setFilteredPackages(filtered);
        } else {
          setFilteredPackages(enriched);
        }
      })
      .catch(error => {
        console.error('Error fetching packages:', error);
        if (error.response?.status === 401) {
          alert('Session expired. Please log in again.');
          navigate('/login');
        }
      });
  }, [location.state, navigate]);

  const handleViewDetails = (pkg: Package) => {
    navigate('/package-details', { state: { pkg } });
  };

  return (
    <>
      <div className="topImageBnr">
        <img src={TopBanner} alt="Top Banner" className="bannertop" />
      </div>

      <br /><br /><br />
      <h2 className="explore-heading text-center mb-4">Explore Our Exclusive Travel Packages</h2>
      <p className="text-muted text-center mb-4">
        <b><em>Enjoy the hottest travel spots around the globe.</em></b>
      </p>

      <div className="explore-container my-4">
        <div className="explore-row row justify-content-center">
          {filteredPackages.length > 0 ? (
            filteredPackages.map((pkg, index) => (
              <div className="explore-col col-md-4 mb-4" key={index}>
                <div className="explore-card card h-100 shadow-sm explore-card-lg">
                  <div className="explore-image-wrapper position-relative">
                    <img
                      src={pkg.image}
                      className="explore-card-img card-img-top"
                      alt={pkg.name}
                    />
                  </div>
                  <div className="explore-card-body card-body px-3 pt-3 pb-2">
                    <h5 className="explore-title fw-bold">{pkg.name}</h5>
                    <p className="text-muted small mb-1">
                      <strong>Start Date:</strong> {pkg.startDate}
                    </p>
                    <p className="text-muted small mb-3">
                      <strong>End Date:</strong> {pkg.endDate}
                    </p>
                    <div className="explore-icons d-flex justify-content-start gap-4 text-secondary fs-5">
                      <i className="bi bi-building" title="Hotels"></i>
                      <i className="bi bi-airplane" title="Flights"></i>
                      <i className="bi bi-camera" title="Sightseeing"></i>
                      <i className="bi bi-egg-fried" title="Meals"></i>
                    </div>
                  </div>
                  <div className="explore-card-footer card-footer bg-white border-top-0 pt-0 px-3 pb-3">
                    <div className="explore-footer-content d-flex justify-content-between align-items-center">
                      <div>
                        <div className="explore-price-label text-muted small">Price</div>
                        <div className="explore-price fw-bold fs-5">{pkg.price}</div>
                        <div className="explore-price-note text-muted small">Per Person on twin sharing</div>
                      </div>
                      <button
                        className="explore-button btn btn-warning btn-sm"
                        onClick={() => handleViewDetails(pkg)}
                      >
                        View Package
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center mt-5">
              <h5>No packages found for your search.</h5>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ExplorePackage;
