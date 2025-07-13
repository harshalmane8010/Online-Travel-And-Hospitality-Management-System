package com.cts.itinerary_service.service;

import com.cts.itinerary_service.model.ItineraryDTO;

import java.util.List;

public interface ItineraryService {

    List<ItineraryDTO> getAllItineraries();

    ItineraryDTO getItineraryById(Long id);

    ItineraryDTO createItinerary(ItineraryDTO itineraryDTO);

    ItineraryDTO updateItinerary(Long id, ItineraryDTO itineraryDTO);

    void deleteItinerary(Long id);

    // For Feign client in package-service
    List<Long> getItineraryIdsByPackageId(Long packageId);

    // ✅ New method to fetch full itinerary customizations by package ID
    List<ItineraryDTO> getItinerariesByPackageId(Long packageId);
}
