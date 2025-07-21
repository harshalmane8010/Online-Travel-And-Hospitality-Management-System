import React, { useEffect, useState } from 'react';
import DestinationCard from '../component/DestinationCard';
import axiosInstance from '../api/axiosInstance';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

// Images
import Maldives from '../assets/maldives.jpg';
import Europe from '../assets/europe.jpg';
import Mauritius from '../assets/Mauritius.jpg';
import Kashmir from '../assets/kashmir.png';

interface Package {
  packageID: number;
  name: string;
  price: string;
  startDate?: string;
  endDate?: string;
  image?: string;
  description?: string;
}

interface DestinationCardData {
  title: string;
  description: string;
  pkg: Package;
}

const TrendingDestinations: React.FC = () => {
  const [destinationCards, setDestinationCards] = useState<DestinationCardData[]>([]);
  const navigate = useNavigate();

  const destinationMap: Record<string, string> = {
    Kashmir: 'Explore the more beauty of Kashmir with snow.',
    Maldives: 'Relax in the tropical paradise of Maldives.',
    Europe: 'Discover the charm and culture of European cities.',
    Mauritius: 'Enjoy the beaches and culture of Mauritius.',
  };

  const imageMap: Record<string, string> = {
    'Maldives Escape': Maldives,
    'Europe Grand Tour': Europe,
    'Mauritius Romance': Mauritius ,
    'Kashmir Serenity': Kashmir,
  };

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await axiosInstance.get<Package[]>('/api/packages');
        const filtered = Object.keys(destinationMap)
          .map(dest => {
            const match = response.data.find(pkg =>
              pkg.name.toLowerCase().includes(dest.toLowerCase())
            );
            if (!match) return null;

            const safePkg: Package = {
              ...match,
              image: imageMap[match.name] ?? Maldives,
            };

            return {
              title: dest,
              description: destinationMap[dest],
              pkg: safePkg,
            };
          })
          .filter((item): item is DestinationCardData => item !== null);

        setDestinationCards(filtered);
      } catch (error: unknown) {
        console.error('Error fetching trending packages:', error);
        if (
          typeof error === 'object' &&
          error !== null &&
          'response' in error &&
          (error as AxiosError).response?.status === 401
        ) {
          alert('Session expired. Please log in again.');
          navigate('/login');
        }
      }
    };

    fetchTrending();
  }, [navigate]);

  return (
    <div className="container text-center mt-4">
      <h1><b>Top Trending Destinations</b></h1>
      <p className="text-muted mb-4"><b><em>Explore the hottest travel spots around the globe.</em></b></p>
      <div className="row justify-content-center g-4">
        {destinationCards.map((item, index) => (
          <DestinationCard
            key={index}
            image={item.pkg.image ?? Maldives}
            title={item.title}
            description={item.description}
            pkg={item.pkg}
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingDestinations;
