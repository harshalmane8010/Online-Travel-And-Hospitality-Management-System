package cts.rcss.controller;

import cts.rcss.model.ReviewDto;
import cts.rcss.service.ReviewService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin("http://localhost:5173/")
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping
    public List<ReviewDto> getAllReviews() {
        return reviewService.getAllReviews();

    }

    @GetMapping("/{id}")
    public ResponseEntity<ReviewDto> getReviewById(@PathVariable int id) {
        ReviewDto dto = reviewService.getReviewById(id);
        return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();

    }

    @PostMapping
    public ReviewDto createReview(@RequestBody ReviewDto reviewDto) {
    	reviewDto.setTimestamp(LocalDateTime.now());
        return reviewService.createReview(reviewDto);

    }

    @PutMapping("/{id}")
    public ResponseEntity<ReviewDto> updateReview(@Valid @PathVariable int id, @RequestBody ReviewDto dto) {
        ReviewDto updated = reviewService.updateReview(id, dto);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable int id) {
        return reviewService.deleteReview(id) ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();

    }

}
 