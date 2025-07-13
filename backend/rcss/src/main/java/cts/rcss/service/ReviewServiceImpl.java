package cts.rcss.service;

import cts.rcss.model.ReviewDto;
import cts.rcss.entity.Review;
import cts.rcss.exception.ReviewNotFoundException;
import cts.rcss.repository.ReviewRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReviewServiceImpl implements ReviewService {

   @Autowired
   public ReviewRepository repo;

   @Autowired
   public ModelMapper mapper;

   @Override
   public List<ReviewDto> getAllReviews() {
       return repo.findAll().stream()
               .map(r -> mapper.map(r, ReviewDto.class))
               .collect(Collectors.toList());

   }

   @Override
   public ReviewDto getReviewById(int id) {
       return repo.findById(id).map(r -> mapper.map(r, ReviewDto.class)).orElse(null);

   }

   @Override
   public ReviewDto createReview(ReviewDto dto) {
       Review entity = mapper.map(dto, Review.class);
       return mapper.map(repo.save(entity), ReviewDto.class);

   }

   @Override
   public ReviewDto updateReview(int id, ReviewDto dto) {
      return repo.findById(id).map(t -> {
          t.setUserID(dto.getUserID());
          t.setRating(dto.getRating());
          t.setComment(dto.getComment());
          t.setTimestamp(dto.getTimestamp());
          return mapper.map(repo.save(t), ReviewDto.class);
      }).orElseThrow(() -> new ReviewNotFoundException("Review not found"));
   }

   @Override
   public boolean deleteReview(int id) {
       if (!repo.existsById(id)) return false;
       repo.deleteById(id);
       return true;

   }

}  
 