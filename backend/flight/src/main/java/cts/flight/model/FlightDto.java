package cts.flight.model;

import java.time.LocalDate;

import cts.flight.model.FlightDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FlightDto {

    @NotNull(message = "Flight ID is required")
    private Long flightId;

    @NotBlank(message = "Airline name is required")
    private String airline;

    @NotBlank(message = "Departure location is required")
    private String departure;

    @NotBlank(message = "Arrival location is required")
    private String arrival;

    @NotNull(message = "Price is required")
    @Positive(message = "Price must be greater than 0")
    private Double price;

    @NotNull(message = "Availability must be specified")
    private Boolean availability;


@NotNull(message = "Departure date is required")
private LocalDate departureDate;

}
