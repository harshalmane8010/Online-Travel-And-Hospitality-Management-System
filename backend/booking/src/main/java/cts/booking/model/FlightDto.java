package cts.booking.model;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FlightDto {
    private Long flightId;
    private String airline;
    private String departure;
    private String arrival;
    private Double price;
    private Boolean availability;
    private LocalDate departureDate;
}
