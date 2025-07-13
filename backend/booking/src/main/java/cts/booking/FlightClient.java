package cts.booking;

import cts.booking.model.FlightDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "FLIGHT-SERVICE") // This should match the flight service's spring.application.name
public interface FlightClient {
    @GetMapping("/flights/{id}")
    FlightDto getFlightById(@PathVariable("id") Long id);
}
