package com.cts.package_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "itinerary-service", url = "http://localhost:8089/api/itineraries") // Replace with actual URL or use service discovery
public interface ItineraryClient {

    @GetMapping("/package/{packageId}/ids")
    List<Long> getItineraryIdsByPackageId(@PathVariable("packageId") Long packageId);
}
