package cts.rcss.controller;
 
import cts.rcss.model.ReviewDto;
import cts.rcss.service.ReviewService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
 
import java.time.LocalDateTime;
import java.util.List;
 
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
 
@ExtendWith(MockitoExtension.class)
public class ReviewControllerTest {
 
    @Mock
    private ReviewService reviewService;
 
    @InjectMocks
    private ReviewController reviewController;
 
    private ReviewDto reviewDto;
 
    @BeforeEach
    void setUp() {
        reviewDto = new ReviewDto(1, 101, 501, 4, "Good stay", LocalDateTime.now());
    }
 
    @Test
    @DisplayName("getAllReviews() returns list")
    void testGetAllReviews() {
        when(reviewService.getAllReviews()).thenReturn(List.of(reviewDto));
        List<ReviewDto> reviews = reviewController.getAllReviews();
        assertEquals(1, reviews.size());
        verify(reviewService).getAllReviews();
    }
 
    @Test
    @DisplayName("getReviewById() returns review when found")
    void testGetReviewById_found() {
        when(reviewService.getReviewById(1)).thenReturn(reviewDto);
        ResponseEntity<ReviewDto> response = reviewController.getReviewById(1);
        assertTrue(response.getStatusCode().is2xxSuccessful());
        assertEquals(reviewDto, response.getBody());
    }
 
    @Test
    @DisplayName("getReviewById() returns 404 when not found")
    void testGetReviewById_notFound() {
        when(reviewService.getReviewById(99)).thenReturn(null);
        ResponseEntity<ReviewDto> response = reviewController.getReviewById(99);
        assertEquals(404, response.getStatusCode().value());
    }
 
    @Test
    @DisplayName("createReview() saves review and returns it")
    void testCreateReview() {
        when(reviewService.createReview(any())).thenReturn(reviewDto);
        ReviewDto created = reviewController.createReview(reviewDto);
        assertEquals(reviewDto.getReviewID(), created.getReviewID());
        verify(reviewService).createReview(any());
    }
 
    @Test
    @DisplayName("updateReview() updates review when found")
    void testUpdateReview_found() {
        when(reviewService.updateReview(eq(1), any())).thenReturn(reviewDto);
        ResponseEntity<ReviewDto> response = reviewController.updateReview(1, reviewDto);
        assertTrue(response.getStatusCode().is2xxSuccessful());
        assertEquals(reviewDto, response.getBody());
    }
 
    @Test
    @DisplayName("updateReview() returns 404 when review not found")
    void testUpdateReview_notFound() {
        when(reviewService.updateReview(eq(1), any())).thenReturn(null);
        ResponseEntity<ReviewDto> response = reviewController.updateReview(1, reviewDto);
        assertEquals(404, response.getStatusCode().value());
    }
 
    @Test
    @DisplayName("deleteReview() returns 200 when deleted")
    void testDeleteReview_found() {
        when(reviewService.deleteReview(1)).thenReturn(true);
        ResponseEntity<Void> response = reviewController.deleteReview(1);
        assertEquals(200, response.getStatusCode().value());
    }
 
    @Test
    @DisplayName("deleteReview() returns 404 when not found")
    void testDeleteReview_notFound() {
        when(reviewService.deleteReview(1)).thenReturn(false);
        ResponseEntity<Void> response = reviewController.deleteReview(1);
        assertEquals(404, response.getStatusCode().value());
    }
}