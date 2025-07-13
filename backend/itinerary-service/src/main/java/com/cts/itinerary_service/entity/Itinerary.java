package com.cts.itinerary_service.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "itineraries")
public class Itinerary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long itineraryID;

    private Long userID;

    private Long packageID; // Decoupled from Package entity

    @Column(length = 500)
    private String customizationDetails;
}
