import React, { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import { BsStarFill, BsStar } from "react-icons/bs";
import "../styles/leaveReview.css";

//  prop type
interface LeaveReviewProps {
  onSubmit: (review: { rating: number; text: string }) => void;
}

// ✅ Use the prop type in the component
const LeaveReview: React.FC<LeaveReviewProps> = ({ onSubmit }) => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [text, setText] = useState<string>("");

  const handleSubmit = () => {
    if (!rating || !text.trim()) return;
    onSubmit({ rating, text });
    setRating(0);
    setText("");
  };

  return (
    <Card className="review-box p-4 shadow-sm mb-4">
      <h4 className="mb-3">Leave a Review</h4>

      <div className="stars mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className="star"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
          >
            {(hover || rating) >= star ? <BsStarFill /> : <BsStar />}
          </span>
        ))}
      </div>

      <Form.Control
        as="textarea"
        rows={3}
        placeholder="Write your comment here…"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="text-center mt-3">
        <Button className="submit-btn" variant="warning" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </Card>
  );
};

export default LeaveReview;
