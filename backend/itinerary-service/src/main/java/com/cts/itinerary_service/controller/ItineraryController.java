package com.cts.itinerary_service.controller;

import com.cts.itinerary_service.model.ItineraryDTO;
import com.cts.itinerary_service.service.ItineraryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


//@CrossOrigin(origins = "http://localhost:5174")
@RestController
@RequestMapping("/api/itineraries")
public class ItineraryController {

    @Autowired
    private ItineraryService itineraryService;

    @GetMapping
    public ResponseEntity<List<ItineraryDTO>> getAllItineraries() {
        return ResponseEntity.ok(itineraryService.getAllItineraries());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItineraryDTO> getItineraryById(@PathVariable Long id) {
        return ResponseEntity.ok(itineraryService.getItineraryById(id));
    }

    @PostMapping
    public ResponseEntity<ItineraryDTO> createItinerary(@Valid @RequestBody ItineraryDTO itineraryDTO) {
        return ResponseEntity.ok(itineraryService.createItinerary(itineraryDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItineraryDTO> updateItinerary(@PathVariable Long id, @Valid @RequestBody ItineraryDTO itineraryDTO) {
        return ResponseEntity.ok(itineraryService.updateItinerary(id, itineraryDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItinerary(@PathVariable Long id) {
        itineraryService.deleteItinerary(id);
        return ResponseEntity.noContent().build();
    }

    // Existing endpoint for Feign client
    @GetMapping("/package/{packageId}/ids")
    public ResponseEntity<List<Long>> getItineraryIdsByPackageId(@PathVariable Long packageId) {
        return ResponseEntity.ok(itineraryService.getItineraryIdsByPackageId(packageId));
    }

    // ✅ New endpoint to fetch full itinerary customizations by package ID
    @GetMapping("/package/{packageId}")
    public ResponseEntity<List<ItineraryDTO>> getItinerariesByPackageId(@PathVariable Long packageId) {
        return ResponseEntity.ok(itineraryService.getItinerariesByPackageId(packageId));
    }
}
