package com.cts.ops.service;

import com.cts.ops.entity.PromotionsEntity;
import com.cts.ops.model.PromotionsDto;
import com.cts.ops.repository.PromotionsRepository;
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
class PromotionsServiceImplTest {

    @Mock
    private PromotionsRepository promotionsRepository;

    @InjectMocks
    private PromotionsServiceImpl promotionsService;

    private PromotionsEntity samplePromo;

    @BeforeEach
    void setUp() {
        samplePromo = new PromotionsEntity(
                1,
                "Flight Fest",
                "₹1000 off on flights",
                1000.0,
                LocalDate.now(),
                LocalDate.now().plusDays(15),
                "Flight"
        );
    }

    @Test
    void shouldReturnAllPromotions() {
        when(promotionsRepository.findAll()).thenReturn(List.of(samplePromo));
        List<PromotionsEntity> result = promotionsService.getAllPromotions();
        assertThat(result).containsExactly(samplePromo);
        verify(promotionsRepository).findAll();
    }

    @Test
    void shouldReturnPromotionsByType() {
        when(promotionsRepository.findByApplicableFor("Flight"))
                .thenReturn(List.of(samplePromo));
        List<PromotionsEntity> result = promotionsService.getPromotionsByType("Flight");
        assertThat(result.get(0).getApplicableFor()).isEqualTo("Flight");
        verify(promotionsRepository).findByApplicableFor("Flight");
    }


    @Test
    void shouldCreatePromotion() {
        PromotionsDto dto = new PromotionsDto();
        dto.setTitle("Flight Fest");
        dto.setDescription("₹1000 off on flights");
        dto.setDiscountAmount(1000.0);
        dto.setValidFrom(LocalDate.now());
        dto.setValidTo(LocalDate.now().plusDays(15));
        dto.setApplicableFor("Flight");
        when(promotionsRepository.save(any(PromotionsEntity.class)))
                .thenReturn(samplePromo);
        PromotionsEntity saved = promotionsService.createPromotion(dto);
        assertThat(saved.getTitle()).isEqualTo(dto.getTitle());
        verify(promotionsRepository).save(any(PromotionsEntity.class));
    }

}
 