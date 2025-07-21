import axiosInstance from "../api/axiosInstance"; // ✅ Auth + baseURL: http://localhost:9999

const BASE_REVIEW_URL = "/api/reviews"; // relative path

export interface Review {
  reviewID: number;
  userID: number;
  hotelID: number;
  rating: number;
  comment: string;
  timestamp: string;
}

// POST: Add a new review (timestamp is auto-set by backend)
export const addReview = async (reviewData: {
  userID: number;
  hotelID: number;
  rating: number;
  comment: string;
}) => {
  const response = await axiosInstance.post(BASE_REVIEW_URL, reviewData);
  return response.data;
};

// GET: Fetch all reviews
export const fetchReviews = async (): Promise<Review[]> => {
  const response = await axiosInstance.get(BASE_REVIEW_URL);
  return response.data;
};

export default {
  addReview,
  fetchReviews,
};
