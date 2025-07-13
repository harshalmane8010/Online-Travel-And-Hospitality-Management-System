package cts.booking.model;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Data
public class PackageDto{
    private Long packageID;
    private String name;
    private String includedHotels;
    private String includedFlights;
    private Map<String, String> activities;
    private Double price;
    private LocalDate startDate;
    private LocalDate endDate;

    // Itinerary IDs fetched from itinerary-service
    private List<Long> itineraryIDs;
}
