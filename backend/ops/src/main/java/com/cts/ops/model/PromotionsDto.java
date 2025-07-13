package com.cts.ops.model;
import jakarta.validation.constraints.*;
import lombok.Data;
import java.time.LocalDate;

@Data
public class PromotionsDto {

   @NotBlank(message = "Title is required")
   @Size(min = 3, message = "Title must be at least 3 characters")
   private String title;

   @NotBlank(message = "Description is required")
   private String description;

   @Positive(message = "Discount amount must be positive")
   private double discountAmount;

   @NotNull(message = "Valid from date is required")
   @FutureOrPresent(message = "Valid from cannot be in the past")
   private LocalDate validFrom;

   @NotNull(message = "Valid to date is required")
   @Future(message = "Valid to must be a future date")
   private LocalDate validTo;

   @NotBlank(message = "ApplicableFor is required")
   private String applicableFor;
}