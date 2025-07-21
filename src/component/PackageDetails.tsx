import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomizePackage from './CustomizePackage';
import '../styles/PackageDetails.css';

interface Package {
  packageID: number;
  name: string;
  startDate: string;
  endDate: string;
  price: string;
  includedFlights?: string;
  includedHotels?: string;
  activities?: { [key: string]: string };
  image?: string;
}

const PackageDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pkg } = location.state as { pkg: Package };
  const [showModal, setShowModal] = useState(false);

  if (!pkg) {
    return <div className="text-center mt-5">Package not found or data missing.</div>;
  }

  return (
    <>
      <div className="package-details container my-5">
        <div className="combined-card shadow rounded overflow-hidden">
          <div className="row g-0">
            <div className="col-md-5">
              {pkg.image && (
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="img-fluid h-100 w-100 object-fit-cover"
                  style={{ borderRight: '1px solid #ddd' }}
                />
              )}
            </div>

            <div className="col-md-7">
              <div className="details-card p-4 bg-white h-100">
                <h2 className="text-center mb-4 text-primary fw-bold">{pkg.name}</h2>

                <div className="mb-3">
                      <p>
                        <strong>
                          <i className="bi bi-calendar-event me-2 text-primary"></i> Start Date:
                        </strong> {pkg.startDate}
                      </p>
                      <p>
                        <strong>
                          <i className="bi bi-calendar-check me-2 text-success"></i> End Date:
                        </strong> {pkg.endDate}
                      </p>
                    </div>

                {pkg.includedFlights && (
                  <div className="info-item mb-3">
                    <h5 className="info-title">
                      <i className="bi bi-airplane-engines-fill me-2 text-primary"></i>
                      Included Flights
                    </h5>
                    <p className="info-text">{pkg.includedFlights}</p>
                  </div>
                )}

                {pkg.includedHotels && (
                  <div className="info-item mb-3">
                    <h5 className="info-title">
                      <i className="bi bi-building-fill-check me-2 text-success"></i>
                      Included Hotels
                    </h5>
                    <p className="info-text">{pkg.includedHotels}</p>
                  </div>
                )}

                {pkg.activities && (
                  <div className="itinerary-section mt-4">
                    <h5 className="info-title mb-3">
                      <i className="bi bi-calendar2-week me-2 text-warning"></i>
                      Day-wise Itinerary
                    </h5>
                    {Object.entries(pkg.activities).map(([day, activity], idx) => (
                      <div className="itinerary-item mb-3" key={idx}>
                        <div className="day-badge">{day}</div>
                        <div className="activity-list">
                          <ul className="mb-0">
                            {activity.split('. ').map((act, i) => (
                              <li key={i}>{act.trim()}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="price-box my-4 text-start">
                  <span className="fs-5 fw-bold">💰Price: </span>
                  <span className="fs-5 ms-2">₹{pkg.price}</span>
                </div>

                <div className="custbtn d-flex gap-3 justify-content-end flex-wrap">
                  <button
                    className="btn btn-outline-primary px-4"
                    onClick={() => setShowModal(true)}
                  >
                    Customize Package
                  </button>
                  <button
                    className="btn btn-success px-4"
                    onClick={() => navigate('/Payment', { state: { pkg } })}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <CustomizePackage pkg={pkg} onClose={() => setShowModal(false)} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PackageDetails;
