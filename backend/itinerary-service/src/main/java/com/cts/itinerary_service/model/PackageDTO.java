package com.cts.itinerary_service.model;

import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
public class PackageDTO {
    private Long packageID;
    private String name;
    private String includedHotels;
    private String includedFlights;
    private String activities;
    private Double price;
    private LocalDate startDate;
    private LocalDate endDate;

    // Itinerary IDs fetched from itinerary-service
    private List<Long> itineraryIDs;
}