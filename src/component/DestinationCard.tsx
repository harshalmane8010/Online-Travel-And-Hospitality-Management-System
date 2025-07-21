import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

interface Package {
  packageID: number;
  name: string;
  price: string;
  startDate?: string;
  endDate?: string;
  image?: string;
  description?: string;
}

interface DestinationCardProps {
  image: string;
  title: string;
  description: string;
  pkg: Package;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ image, title, description, pkg }) => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate('/package-details', { state: { pkg } });
  };

  return (
    <div className="col-md-3 col-sm-6">
      <div className="destcard h-100 shadow-sm" style={{ borderRadius: '12px', overflow: 'hidden', transition: 'transform 0.3s ease' }}>
        <img
          src={image}
          className="card-img-top"
          alt={title}
          style={{ height: '180px', objectFit: 'cover' }}
        />
        <div className="destcard-body d-flex flex-column justify-content-between">
          <div>
            <h5 className="destcard-title">{title}</h5>
            <p className="card-text">{description}</p>
          </div>
          <button className="packageexplore-btnn mt-3" onClick={handleExplore}>
            Explore
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
