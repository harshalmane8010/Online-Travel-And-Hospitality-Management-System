package com.cts.itinerary_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients(basePackages = "com.cts.itinerary_service.client")

public class ItineraryServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ItineraryServiceApplication.class, args);
    }
}
