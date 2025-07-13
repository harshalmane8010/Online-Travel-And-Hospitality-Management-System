package cts.payment.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaymentDto {

	//@NotNull(message = "Payment ID should be null when creating a new payment")
    private Long paymentId;

    @NotNull(message = "User ID is required")
    private Long userId;

    @NotNull(message = "Booking ID is required")
    private Long bookingId;

    @NotNull(message = "Amount is required")
    @Positive(message = "Amount must be positive")
    private Double totalAmount;

    @NotBlank(message = "Status is required")
    private String status;

    @NotBlank(message = "Payment method is required")
    private String paymentMethod;
}
