import React from "react";
import "../styles/review.css"; 


//  Review type matching backend
export interface Review {
  reviewId: number;
  userId: number;
  hotelId: number;
  rating: number;
  comment: string;
  timestamp: string;
}

// Props interface
interface GuestReviewsProps {
  reviews: Review[];
}

const GuestReviews: React.FC<GuestReviewsProps> = ({ reviews }) => {
  return (
    <div className="guest-reviews">
      <h3 className="guest-reviews-title">Guest Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <div key={review.reviewId} className="review-card">
            <div className="review-header">
              <strong>User ID:</strong> {review.userId} &nbsp;|&nbsp;
              <strong>Hotel ID:</strong> {review.hotelId}
            </div>
            <div className="review-rating">⭐ {review.rating}/5</div>
            <div className="review-comment">"{review.comment}"</div>
            <div className="review-timestamp">
              <small>Reviewed on: {new Date(review.timestamp).toLocaleString()}</small>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default GuestReviews;