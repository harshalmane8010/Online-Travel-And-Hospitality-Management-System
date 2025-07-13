package com.cts.ops.service;

import com.cts.ops.entity.OffersEntity;
import com.cts.ops.model.OffersDto;
import com.cts.ops.repository.OffersRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import java.time.LocalDate;
import java.util.List;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class OffersServiceImplTest {

    @Mock
    private OffersRepository offersRepository;

    @InjectMocks
    private OffersServiceImpl offersService;   //  ← your implementation class

    private OffersEntity sampleOffer;

    @BeforeEach
    void setUp() {

        sampleOffer = new OffersEntity(
                1,                             // offerId
                "Summer Offer",
                "Get 15% off",
                15.0,
                LocalDate.now(),
                LocalDate.now().plusDays(30),
                "Hotel"
        );
    }


    @Test
    void shouldReturnAllOffers() {
        when(offersRepository.findAll()).thenReturn(List.of(sampleOffer));
        List<OffersEntity> result = offersService.getAllOffers();
        assertThat(result).containsExactly(sampleOffer);
        verify(offersRepository, times(1)).findAll();
    }


    @Test
    void shouldReturnActiveOffers() {
        when(offersRepository.findByStartDateBeforeAndEndDateAfter(
                any(LocalDate.class), any(LocalDate.class)))
                .thenReturn(List.of(sampleOffer));
        List<OffersEntity> result = offersService.getActiveOffers();
        assertThat(result).hasSize(1);
        verify(offersRepository).findByStartDateBeforeAndEndDateAfter(
                any(LocalDate.class), any(LocalDate.class));
    }


    @Test
    void shouldReturnOffersByType() {
        when(offersRepository.findByApplicableTo("Hotel"))
                .thenReturn(List.of(sampleOffer));
        List<OffersEntity> result = offersService.getOffersByType("Hotel");
        assertThat(result.get(0).getApplicableTo()).isEqualTo("Hotel");
        verify(offersRepository).findByApplicableTo("Hotel");
    }


    @Test
    void shouldCreateOffer() {
        OffersDto dto = new OffersDto();
        dto.setTitle("Summer Offer");
        dto.setDescription("Get 15% off");
        dto.setDiscountPercentage(15.0);
        dto.setStartDate(LocalDate.now());
        dto.setEndDate(LocalDate.now().plusDays(30));
        dto.setApplicableTo("Hotel");
        when(offersRepository.save(any(OffersEntity.class))).thenReturn(sampleOffer);
        OffersEntity saved = offersService.createOffer(dto);
        assertThat(saved.getTitle()).isEqualTo(dto.getTitle());
        verify(offersRepository).save(any(OffersEntity.class));

    }
}
 