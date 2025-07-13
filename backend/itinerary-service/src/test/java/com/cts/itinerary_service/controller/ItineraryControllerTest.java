package com.cts.itinerary_service.controller;

import com.cts.itinerary_service.model.ItineraryDTO;
import com.cts.itinerary_service.service.ItineraryService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ItineraryControllerTest {

    @Mock
    private ItineraryService itineraryService;

    @InjectMocks
    private ItineraryController itineraryController;

    private ItineraryDTO itineraryDTO;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        itineraryDTO = new ItineraryDTO();
        itineraryDTO.setItineraryID(1L);
        itineraryDTO.setUserID(100L);
        itineraryDTO.setPackageID(200L);
        itineraryDTO.setCustomizationDetails("Details");
    }

    @Test
    void testGetAllItineraries() {
        when(itineraryService.getAllItineraries()).thenReturn(List.of(itineraryDTO));

        ResponseEntity<List<ItineraryDTO>> response = itineraryController.getAllItineraries();

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(1, response.getBody().size());
    }

    @Test
    void testGetItineraryById() {
        when(itineraryService.getItineraryById(1L)).thenReturn(itineraryDTO);

        ResponseEntity<ItineraryDTO> response = itineraryController.getItineraryById(1L);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(100L, response.getBody().getUserID());
    }

    @Test
    void testCreateItinerary() {
        when(itineraryService.createItinerary(itineraryDTO)).thenReturn(itineraryDTO);

        ResponseEntity<ItineraryDTO> response = itineraryController.createItinerary(itineraryDTO);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Details", response.getBody().getCustomizationDetails());
    }

    @Test
    void testUpdateItinerary() {
        when(itineraryService.updateItinerary(1L, itineraryDTO)).thenReturn(itineraryDTO);

        ResponseEntity<ItineraryDTO> response = itineraryController.updateItinerary(1L, itineraryDTO);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(200L, response.getBody().getPackageID());
    }

    @Test
    void testDeleteItinerary() {
        doNothing().when(itineraryService).deleteItinerary(1L);

        ResponseEntity<Void> response = itineraryController.deleteItinerary(1L);

        assertEquals(204, response.getStatusCodeValue());
        verify(itineraryService, times(1)).deleteItinerary(1L);
    }

    @Test
    void testGetItineraryIdsByPackageId() {
        when(itineraryService.getItineraryIdsByPackageId(200L)).thenReturn(List.of(1L, 2L));

        ResponseEntity<List<Long>> response = itineraryController.getItineraryIdsByPackageId(200L);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(List.of(1L, 2L), response.getBody());
    }
}
