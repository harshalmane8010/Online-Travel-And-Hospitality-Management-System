package com.cts.package_service.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "packages")
public class Package {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long packageID;

    @Column(nullable = false)
    private String name;

    private String includedHotels;
    private String includedFlights;
    
    @Column(columnDefinition = "TEXT")
    private String activities;


    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;
    
//    private String url;

    // Removed Itinerary relationship for microservices decoupling
}
