import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance"; // ✅ Auth-aware request handler
import "../styles/rev.css";

// Match backend structure
interface Review {
  reviewID: number;
  userID: number;
  hotelID: number;
  rating: number;
  comment: string;
  timestamp: string;
}

const Rev: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState<string | null>(null); // Optional error display

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axiosInstance.get("/api/reviews"); // ✅ relative path
      setReviews(response.data);
    } catch (err: any) {
      console.error("Error fetching reviews:", err);
      setError(err.response?.data || "Failed to load reviews.");
    }
  };

  return (
    <Container className="rev-container mt-5">
      <div className="rev-header d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">🌟 Package Reviews from Our Travelers</h4>
        <Link to="/reviews" className="rev-link">
          Go to reviews →
        </Link>
      </div>

      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
      )}

      <Row className="flex-nowrap overflow-auto gx-4">
        {reviews.map((review) => (
          <Col
            xs={10}
            sm={6}
            md={4}
            lg={3}
            xl={3}
            key={review.reviewID}
            className="flex-shrink-0"
          >
            <Card className="rev-card shadow-sm">
              <div className="star-row mb-2">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="star">
                    ★
                  </span>
                ))}
              </div>
              <Card.Title className="rev-title">
                User ID: {review.userID}
              </Card.Title>
              <Card.Text className="rev-message">"{review.comment}"</Card.Text>
              <Card.Footer className="rev-footer text-muted">
                <strong>Hotel ID: {review.hotelID}</strong>,{" "}
                {new Date(review.timestamp).toLocaleDateString()}
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Rev;
