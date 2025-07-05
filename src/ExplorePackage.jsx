import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './Explorepackage.css';
import Maldives from './assets/Maldives.jpg';
import TopBanner from './assets/explorebg.jpg';

const packages = [
  {
    title: "Grand Fascinating Europe",
    startDate: "2025-08-10",
    endDate: "2025-08-19",
    price: "₹ 2,35,564",
    image: Maldives,
    flights: "Included round-trip international flights",
    hotels: "4-star hotels in all cities",
    itinerary: [
      "Day 1: Arrival in London, city tour",
      "Day 2: London sightseeing & Thames cruise",
      "Day 3: Eurostar to Paris, Eiffel Tower visit",
      "Day 4: Louvre Museum & Seine River cruise",
      "Day 5: Travel to Geneva, evening leisure"
    ]
  },
  {
    title: "Grand Fascinating Europe",
    startDate: "2025-08-10",
    endDate: "2025-08-19",
    price: "₹ 2,35,564",
    image: Maldives,
    flights: "Included round-trip international flights",
    hotels: "4-star hotels in all cities",
    itinerary: [
      "Day 1: Arrival in London, city tour",
      "Day 2: London sightseeing & Thames cruise",
      "Day 3: Eurostar to Paris, Eiffel Tower visit",
      "Day 4: Louvre Museum & Seine River cruise",
      "Day 5: Travel to Geneva, evening leisure"
    ]
  },
  {
    title: "Grand Fascinating Europe",
    startDate: "2025-08-10",
    endDate: "2025-08-19",
    price: "₹ 2,35,564",
    image: Maldives,
    flights: "Included round-trip international flights",
    hotels: "4-star hotels in all cities",
    itinerary: [
      "Day 1: Arrival in London, city tour",
      "Day 2: London sightseeing & Thames cruise",
      "Day 3: Eurostar to Paris, Eiffel Tower visit",
      "Day 4: Louvre Museum & Seine River cruise",
      "Day 5: Travel to Geneva, evening leisure"
    ]
  },
  {
    title: "Graijnfunuenfuef",
    startDate: "2025-08-10",
    endDate: "2025-08-19",
    price: "₹ 2,35,564",
    image: Maldives,
    flights: "Included round-trip international flights",
    hotels: "4-star hotels in all cities",
    itinerary: [
      "Day 1: Arrival in London, city tour",
      "Day 2: London sightseeing & Thames cruise",
      "Day 3: Eurostar to Paris, Eiffel Tower visit",
      "Day 4: Louvre Museum & Seine River cruise",
      "Day 5: Travel to Geneva, evening leisure"
    ]
  },
];

const ExplorePackage = () => {
  const navigate = useNavigate();

  const handleViewDetails = (pkg, index) => {
    navigate(`/package/${index}`, { state: { pkg } });
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
          {packages.map((pkg, index) => (
            <div className="explore-col col-md-4 mb-4" key={index}>
              <div className="explore-card card h-100 shadow-sm explore-card-lg">
                <div className="explore-image-wrapper position-relative">
                  <img src={pkg.image} className="explore-card-img card-img-top" alt={pkg.title} />
                </div>
                <div className="explore-card-body card-body px-3 pt-3 pb-2">
                  <h5 className="explore-title fw-semibold">{pkg.title}</h5>
                  <p className="text-muted small mb-1">
                    <strong>Start Date:</strong> {pkg.startDate}
                  </p>
                  <p className="text-muted small mb-3">
                    <strong>End Date:</strong> {pkg.endDate}
                  </p>

                  {/* Icons Row */}
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
                      <div className="explore-price fw-bold text-danger fs-5">{pkg.price}</div>
                      <div className="explore-price-note text-muted small">Per Person on twin sharing</div>
                    </div>
                    <button
                      className="explore-button btn btn-danger btn-sm"
                      onClick={() => handleViewDetails(pkg, index)}
                    >
                      View Package
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ExplorePackage;
