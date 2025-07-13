package com.cts.ops.model;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OffersDto {

    @NotBlank(message = "Title is mandatory")
    @Size(min = 3, message = "Title must be at least 3 characters long")
    private String title;
    @NotBlank(message = "Description is mandatory")
    private String description;

    @Positive(message = "Discount must be a positive value")
    private double discountPercentage;

    @NotNull(message = "Start date is required")
    @FutureOrPresent(message = "Start date cannot be in the past")
    private LocalDate startDate;

    @NotNull(message = "End date is required")
    @Future(message = "End date must be in the future")
    private LocalDate endDate;

    @NotBlank(message = "ApplicableTo is required (Hotel/Flight/Package)")
    private String applicableTo;

}
 