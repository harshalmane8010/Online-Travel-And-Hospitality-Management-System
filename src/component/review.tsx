import React, { useState, useEffect } from "react";
import LeaveReview from "./LeaveReview";
import GuestReviews from "./GuestReview";
import { Container } from "react-bootstrap";
import "../styles/review.css";
import { fetchReviews, addReview } from "../services/reviewService";
import axiosInstance from "../api/axiosInstance"; // ✅ uses axios with auth headers

interface Review {
  reviewId: number;
  userId: number;
  hotelId: number;
  rating: number;
  comment: string;
  timestamp: string;
}

const ReviewComponent: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userId, setUserId] = useState<number>(0); // ✅ track logged-in user

  useEffect(() => {
    loadReviews();
    fetchUserId();
  }, []);

  const loadReviews = async () => {
    try {
      const data = await fetchReviews();
      setReviews(
        data.map((review: any) => ({
          reviewId: review.reviewID,
          userId: review.userID,
          hotelId: review.hotelID,
          rating: review.rating,
          comment: review.comment,
          timestamp: review.timestamp,
        }))
      );
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const fetchUserId = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const email = payload.email || payload.sub;

      const res = await axiosInstance.get(`/user-api/users/email/${email}`);
      setUserId(res.data?.userId || 0);
    } catch (err) {
      console.error("Error decoding token or fetching user ID:", err);
    }
  };

  const handleNewReview = async (reviewInput: {
    hotelID: number;
    rating: number;
    comment: string;
  }) => {
    if (userId <= 0) {
      alert("⚠️ Unable to identify user. Please log in again.");
      return;
    }

    try {
      const fullReview = { ...reviewInput, userID: userId };
      await addReview(fullReview);
      alert("✅ Your review is submitted!");
      loadReviews();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <Container className="review-wrapper my-4">
      <LeaveReview
        onSubmit={(review: { rating: number; text: string }) => {
          const transformedReview = {
            hotelID: 1, // ✅ static for now; make dynamic later
            rating: review.rating,
            comment: review.text,
          };
          handleNewReview(transformedReview);
        }}
      />
      <GuestReviews reviews={reviews} />
    </Container>
  );
};

export default ReviewComponent;
