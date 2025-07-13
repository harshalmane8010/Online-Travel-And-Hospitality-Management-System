package cts.rcss.service;

import cts.rcss.entity.Review;
import cts.rcss.exception.ReviewNotFoundException;
import cts.rcss.model.ReviewDto;
import cts.rcss.repository.ReviewRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.modelmapper.ModelMapper;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import static java.util.Collections.emptyList;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ReviewServiceImplTest {

    @Mock
    private ReviewRepository repo;

    @InjectMocks
    private ReviewServiceImpl service;
    private ModelMapper mapper;
    private Review    entity;
    private ReviewDto dto;

    @BeforeEach
    void setUp() {

        mapper = new ModelMapper();
        ReflectionTestUtils.setField(service, "mapper", mapper);
        entity = new Review(1, 101, 501, 4, "Good stay", LocalDateTime.now());
        dto    = mapper.map(entity, ReviewDto.class);

    }

    @Test
    @DisplayName("getAllReviews() returns mapped list")
    void getAllReviews_returnsList() {
        when(repo.findAll()).thenReturn(List.of(entity));
        assertEquals(1, service.getAllReviews().size());

    }

    @Test
    @DisplayName("createReview() maps DTO→entity→DTO")
    void createReview_savesAndReturnsDto() {
        when(repo.save(any())).thenReturn(entity);
        assertEquals(4, service.createReview(dto).getRating());

    } 

    @Test
    @DisplayName("updateReview() updates entity when id exists")
    void updateReview_success() {
    	
        when(repo.findById(1)).thenReturn(Optional.of(entity));
        when(repo.save(any())).thenReturn(entity);
        ReviewDto changes = new ReviewDto(
                1, 101, 501, 5, "Excellent stay!", LocalDateTime.now()

        );

        ReviewDto updated = service.updateReview(1, changes);
        assertEquals(5, updated.getRating());
        assertEquals("Excellent stay!", updated.getComment());

    }

    @Test
    @DisplayName("updateReview() throws ReviewNotFoundException when id missing")
    void updateReview_notFound() {

        when(repo.findById(99)).thenReturn(Optional.empty());
        assertThrows(
                ReviewNotFoundException.class,
                () -> service.updateReview(99, dto)
        );

        verify(repo, never()).save(any());

    }

    @Test
    @DisplayName("deleteReview() returns true when id exists")
    void deleteReview_success() {

        when(repo.existsById(1)).thenReturn(true);
        assertTrue(service.deleteReview(1));
        verify(repo).deleteById(1);

    }

    @Test
    @DisplayName("deleteReview() returns false when id missing")
    void deleteReview_notFound() {
        when(repo.existsById(42)).thenReturn(false);
        assertFalse(service.deleteReview(42));
        verify(repo, never()).deleteById(anyInt());

    }

}
 