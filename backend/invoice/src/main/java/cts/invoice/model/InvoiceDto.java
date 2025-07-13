package cts.invoice.model;

import java.time.LocalDateTime;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InvoiceDto {

    //@Null(message = "Invoice ID should be null when creating a new invoice")
    private Long invoiceId;

    @NotNull(message = "Booking ID is required")
    private Long bookingId;

    @NotNull(message = "User ID is required")
    private Long userId;

    @NotNull(message = "Total amount is required")
    @Positive(message = "Total amount must be positive")
    private Double totalAmount;

    @PastOrPresent(message="Timestamp cannot be in Future")
    private LocalDateTime timestamp;
    

//    private Long bookingId;
//    private Long userId;

}
