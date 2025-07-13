package com.cts.itinerary_service.service;

import com.cts.itinerary_service.entity.Itinerary;
import com.cts.itinerary_service.exception.ResourceNotFoundException;
import com.cts.itinerary_service.mapper.ItineraryMapper;
import com.cts.itinerary_service.model.ItineraryDTO;
import com.cts.itinerary_service.repository.ItineraryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ItineraryServiceImplTest {

    @Mock
    private ItineraryRepository itineraryRepository;

    @Mock
    private ItineraryMapper itineraryMapper;

    @InjectMocks
    private ItineraryServiceImpl itineraryService;

    private Itinerary itinerary;
    private ItineraryDTO itineraryDTO;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        itinerary = new Itinerary();
        itinerary.setItineraryID(1L);
        itinerary.setUserID(100L);
        itinerary.setPackageID(200L);
        itinerary.setCustomizationDetails("Details");

        itineraryDTO = new ItineraryDTO();
        itineraryDTO.setItineraryID(1L);
        itineraryDTO.setUserID(100L);
        itineraryDTO.setPackageID(200L);
        itineraryDTO.setCustomizationDetails("Details");
    }

    @Test
    void testGetAllItineraries() {
        when(itineraryRepository.findAll()).thenReturn(List.of(itinerary));
        when(itineraryMapper.toDTO(itinerary)).thenReturn(itineraryDTO);

        List<ItineraryDTO> result = itineraryService.getAllItineraries();

        assertEquals(1, result.size());
        assertEquals(100L, result.get(0).getUserID());
    }

    @Test
    void testGetItineraryById_Found() {
        when(itineraryRepository.findById(1L)).thenReturn(Optional.of(itinerary));
        when(itineraryMapper.toDTO(itinerary)).thenReturn(itineraryDTO);

        ItineraryDTO result = itineraryService.getItineraryById(1L);

        assertEquals(100L, result.getUserID());
    }

    @Test
    void testGetItineraryById_NotFound() {
        when(itineraryRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> itineraryService.getItineraryById(1L));
    }

    @Test
    void testCreateItinerary() {
        when(itineraryMapper.toEntity(itineraryDTO)).thenReturn(itinerary);
        when(itineraryRepository.save(itinerary)).thenReturn(itinerary);
        when(itineraryMapper.toDTO(itinerary)).thenReturn(itineraryDTO);

        ItineraryDTO result = itineraryService.createItinerary(itineraryDTO);

        assertEquals("Details", result.getCustomizationDetails());
    }

    @Test
    void testUpdateItinerary_Found() {
        when(itineraryRepository.findById(1L)).thenReturn(Optional.of(itinerary));
        when(itineraryRepository.save(itinerary)).thenReturn(itinerary);
        when(itineraryMapper.toDTO(itinerary)).thenReturn(itineraryDTO);

        ItineraryDTO result = itineraryService.updateItinerary(1L, itineraryDTO);

        assertEquals(200L, result.getPackageID());
    }

    @Test
    void testUpdateItinerary_NotFound() {
        when(itineraryRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> itineraryService.updateItinerary(1L, itineraryDTO));
    }

    @Test
    void testDeleteItinerary() {
        doNothing().when(itineraryRepository).deleteById(1L);

        itineraryService.deleteItinerary(1L);

        verify(itineraryRepository, times(1)).deleteById(1L);
    }

    @Test
    void testGetItineraryIdsByPackageId() {
        when(itineraryRepository.findByPackageID(200L)).thenReturn(List.of(itinerary));

        List<Long> result = itineraryService.getItineraryIdsByPackageId(200L);

        assertEquals(List.of(1L), result);
    }
}
