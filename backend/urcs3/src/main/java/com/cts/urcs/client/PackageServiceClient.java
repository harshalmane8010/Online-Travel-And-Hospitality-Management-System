package com.cts.urcs.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.cts.urcs.model.PackageDto;

@FeignClient(name = "Package-service")
public interface PackageServiceClient {
	@GetMapping("/package/{id}")
    PackageDto getFlightById(@PathVariable("id") Long id);
}

