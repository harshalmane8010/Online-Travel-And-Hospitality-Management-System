import React from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import './PackageDetail.css';

const PackageDetails = () => {
  const { state } = useLocation();
  const { pkg } = state || {};
  const { id } = useParams();
  const navigate = useNavigate();

  if (!pkg) {
    return <div className="text-center mt-5">Package not found or data missing.</div>;
  }

  return (
    <div className="package-details container-fluid my-5">
      <div className="details-card manual-width p-4 rounded">
        <h2 className="details-title text-center mb-4">{pkg.title}</h2>
        <img src={pkg.image} alt={pkg.title} className="details-img mb-4" />

        <div className="details-info mb-3">
          <p><strong>📅 Start Date:</strong> {pkg.startDate}</p>
          <p><strong>📅 End Date:</strong> {pkg.endDate}</p>
        </div>

        {/* Icons Section */}
        <div className="details-icons d-flex justify-content-start gap-4 text-secondary fs-5 mb-4">
          <i className="bi bi-building" title="Hotels"></i>
          <i className="bi bi-airplane" title="Flights"></i>
          <i className="bi bi-camera" title="Sightseeing"></i>
          <i className="bi bi-egg-fried" title="Meals"></i>
        </div>

        {pkg.flights && (
          <>
            <h4 className="section-heading">✈️ Included Flights</h4>
            <div className="info-box">
              <p>{pkg.flights}</p>
            </div>
          </>
        )}

        {pkg.hotels && (
          <>
            <h4 className="section-heading">🏨 Included Hotels</h4>
            <div className="info-box">
              <p>{pkg.hotels}</p>
            </div>
          </>
        )}

        {pkg.itinerary && (
          <>
            <h4 className="section-heading">🗓️ Day-wise Itinerary</h4>
            <div className="itinerary-section">
              {pkg.itinerary.map((day, idx) => {
                const dayNumber = `Day ${idx + 1}`;
                const activities = day.split('. ').filter(Boolean);

                return (
                  <div className="itinerary-day-box" key={idx}>
                    <div className="day-circle">{dayNumber}</div>
                    <div className="day-details">
                      <div className="day-header">{dayNumber}</div>
                      <ul>
                        {activities.map((activity, i) => (
                          <li key={i}>{activity.trim()}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        <div className="details-buttons d-flex gap-3 mt-4 justify-content-center">
        <button
  className="btn btn-outline-primary px-4"
  onClick={() => navigate('/customize-itinerary', { state: { pkg } })}
>
  Customize Package
</button>

          <button className="btn btn-success px-4">Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
