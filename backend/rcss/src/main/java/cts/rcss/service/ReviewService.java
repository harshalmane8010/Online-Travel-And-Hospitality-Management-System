package cts.rcss.service;

import cts.rcss.model.ReviewDto;

import java.util.List;

public interface ReviewService {
    List<ReviewDto> getAllReviews();
    ReviewDto getReviewById(int id);
    ReviewDto createReview(ReviewDto reviewDto);
    ReviewDto updateReview(int id, ReviewDto dto);
    boolean deleteReview(int id);
}
