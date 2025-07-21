import React from "react";
import '../styles/CategoryBlock.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container, Row, Col } from 'react-bootstrap';
import Kerala from '../assets/kerala.jpg';

interface Category {
  name: string;
  img: string;
  active?: boolean;
}

const categories: Category[] = [
  { name: 'India', img: Kerala },
  { name: 'Maldives', img: Kerala },
  { name: 'Thailand', img: Kerala },
  { name: 'Italy', img: Kerala },
  { name: 'America', img: Kerala },
  { name: 'Europe', img: Kerala },
];

const CategoryBlock: React.FC = () => {
  return (
    <div className="category-container shadow-sm p-2 rounded-pill d-flex align-items-center overflow-auto">
      {categories.map((category, index) => (
        <div
          key={index}
          className={`category-item d-flex align-items-center mx-2 ${
            category.active ? "active-category" : ""
          }`}
        >
          <img
            src={category.img}
            alt={category.name}
            className="category-img me-2"
          />
          <span className="category-text">{category.name}</span>
        </div>
      ))}
    </div>
  );
};

export default CategoryBlock;
