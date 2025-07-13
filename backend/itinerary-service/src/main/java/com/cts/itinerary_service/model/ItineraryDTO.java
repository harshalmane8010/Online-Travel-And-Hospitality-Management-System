package com.cts.itinerary_service.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ItineraryDTO {

    private Long itineraryID;

    @NotNull(message = "User ID is required")
    private Long userID;

    @Size(max = 500, message = "Customization details must be under 500 characters")
    private String customizationDetails;

    @NotNull(message = "Package ID is required")
    private Long packageID;
}
