package com.cts.ops.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "promotions")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class PromotionsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int promotionId;
    private String title;
    private String description;
    private double discountAmount;
    private LocalDate validFrom;
    private LocalDate validTo;
    private String applicableFor;
}
 