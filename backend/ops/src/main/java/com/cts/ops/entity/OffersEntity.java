package com.cts.ops.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "offers")
public class OffersEntity {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int offerId;
    
    private String title;
    private String description;
    private double discountPercentage;
    private LocalDate startDate;
    private LocalDate endDate;
    private String applicableTo;

}

