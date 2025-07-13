package com.cts.ops.controller;

import com.cts.ops.model.PromotionsDto;
import com.cts.ops.service.PromotionsService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import java.time.LocalDate;
import java.util.Collections;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(PromotionsController.class)
public class PromotionsControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PromotionsService promotionsService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testGetAllPromotions() throws Exception {
        Mockito.when(promotionsService.getAllPromotions()).thenReturn(Collections.emptyList());
        mockMvc.perform(get("/api/promotions"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }
    
    @Test
    public void testCreatePromotion() throws Exception {
        PromotionsDto dto = new PromotionsDto();
        dto.setTitle("Flight Fest");
        dto.setDescription("₹1000 off on flights");
        dto.setDiscountAmount(1000.0);
        dto.setValidFrom(LocalDate.now());
        dto.setValidTo(LocalDate.now().plusDays(10));
        dto.setApplicableFor("Flight");
        mockMvc.perform(post("/api/promotions")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk());

    }

}
 