import React from 'react';

interface DestinationCardProps {
  image: string;
  title: string;
  description: string;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ image, title, description }) => {
  return (
    <div className="col-md-3 col-sm-6">
      <div className="card">
        <img src={image} className="card-img-top" alt={title} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <button className="btn btn-outline-primary btn-sm">Explore</button>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
