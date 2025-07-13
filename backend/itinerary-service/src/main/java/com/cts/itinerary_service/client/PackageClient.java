package com.cts.itinerary_service.client;

import com.cts.itinerary_service.model.PackageDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "package-service")
public interface PackageClient {

    @GetMapping("/api/packages/{id}")
    PackageDTO getPackageById(@PathVariable("id") Long id);
}
