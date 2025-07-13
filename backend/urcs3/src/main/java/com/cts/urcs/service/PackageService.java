package com.cts.urcs.service;

import com.cts.urcs.client.PackageServiceClient;
import com.cts.urcs.model.PackageDto;

public class PackageService {
	private final PackageServiceClient packageServiceClient;

    public PackageService(PackageServiceClient packageServiceClient) {
        this.packageServiceClient = packageServiceClient;
    }

    public PackageDto fetchFlight(Long id) {
        return packageServiceClient.getFlightById(id);
    }
}
