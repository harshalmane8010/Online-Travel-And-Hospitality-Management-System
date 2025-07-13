package com.cts.itinerary_service.service;

import com.cts.itinerary_service.entity.Itinerary;
import com.cts.itinerary_service.exception.ResourceNotFoundException;
import com.cts.itinerary_service.mapper.ItineraryMapper;
import com.cts.itinerary_service.model.ItineraryDTO;
import com.cts.itinerary_service.repository.ItineraryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ItineraryServiceImpl implements ItineraryService {

    @Autowired
    private ItineraryRepository itineraryRepository;

    @Autowired
    private ItineraryMapper itineraryMapper;

    @Override
    public List<ItineraryDTO> getAllItineraries() {
        return itineraryRepository.findAll().stream()
                .map(itineraryMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ItineraryDTO getItineraryById(Long id) {
        Itinerary itinerary = itineraryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Itinerary not found with ID: " + id));
        return itineraryMapper.toDTO(itinerary);
    }

    @Override
    public ItineraryDTO createItinerary(ItineraryDTO dto) {
        Itinerary itinerary = itineraryMapper.toEntity(dto);
        return itineraryMapper.toDTO(itineraryRepository.save(itinerary));
    }

    @Override
    public ItineraryDTO updateItinerary(Long id, ItineraryDTO dto) {
        Itinerary existing = itineraryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Itinerary not found with ID: " + id));

        existing.setUserID(dto.getUserID());
        existing.setCustomizationDetails(dto.getCustomizationDetails());
        existing.setPackageID(dto.getPackageID());

        return itineraryMapper.toDTO(itineraryRepository.save(existing));
    }

    @Override
    public void deleteItinerary(Long id) {
        itineraryRepository.deleteById(id);
    }

    @Override
    public List<Long> getItineraryIdsByPackageId(Long packageId) {
        return itineraryRepository.findByPackageID(packageId).stream()
                .map(Itinerary::getItineraryID)
                .collect(Collectors.toList());
    }

    // ✅ New method to fetch full itinerary customizations by package ID
    @Override
    public List<ItineraryDTO> getItinerariesByPackageId(Long packageId) {
        return itineraryRepository.findByPackageID(packageId).stream()
                .map(itineraryMapper::toDTO)
                .collect(Collectors.toList());
    }
}
