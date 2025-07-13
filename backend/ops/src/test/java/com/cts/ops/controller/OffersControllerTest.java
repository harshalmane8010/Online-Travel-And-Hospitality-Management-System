package com.cts.ops.controller;

import com.cts.ops.model.OffersDto;
import com.cts.ops.service.OffersService;
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

@WebMvcTest(OffersController.class)
public class OffersControllerTest {

	@Autowired
   private MockMvc mockMvc;

	@MockBean
    private OffersService offersService;
    
	@Autowired
    private ObjectMapper objectMapper;
   
	@Test
    public void testGetAllOffers() throws Exception {
       Mockito.when(offersService.getAllOffers()).thenReturn(Collections.emptyList());
       mockMvc.perform(get("/api/offers"))
               .andExpect(status().isOk())
               .andExpect(content().json("[]"));
   }
   
	@Test
    public void testCreateOffer() throws Exception {
       OffersDto offerDto = new OffersDto();
       offerDto.setTitle("Test Offer");
       offerDto.setDescription("Get 20% off");
       offerDto.setDiscountPercentage(20.0);
       offerDto.setStartDate(LocalDate.now());
       offerDto.setEndDate(LocalDate.now().plusDays(10));
       offerDto.setApplicableTo("Hotel");
       mockMvc.perform(post("/api/offers")
                       .contentType(MediaType.APPLICATION_JSON)
                       .content(objectMapper.writeValueAsString(offerDto)))
               .andExpect(status().isOk());
   }
}