package cts.payment.model;

import java.time.LocalDate;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingDto {

    @NotNull(message = "Booking ID is required")
    private Long bookingId;

    @NotNull(message = "User ID is required")
    @Min(value = 1, message = "User ID must be greater than 0")
    private Long userId;

    @NotBlank(message = "Type is required")
    private String type;

    @NotBlank(message = "Status is required")
    private String status;

    @NotNull(message = "Payment ID is required")
    @Min(value = 1, message = "Payment ID must be greater than 0")
    private Long paymentId;

    @NotNull(message = "Booking date is required")
    @FutureOrPresent(message = "Booking date cannot be in the past")
    private LocalDate bookingDate;

    private Long hotelId;

    @Min(value = 1, message = "Rooms booked must be at least 1")
    private Integer roomsBooked;

    private Long flightId; // ✅ Only used if type == "Flight"
    private Long packageId;
    
}
