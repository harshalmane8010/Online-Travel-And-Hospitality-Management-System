package cts.flight.mapper;

import cts.flight.entity.Flight;
import cts.flight.model.FlightDto;

public class FlightMapper {

	public static Flight toEntity(FlightDto dto) {
	    return new Flight(
	        dto.getFlightId(),
	        dto.getAirline(),
	        dto.getDeparture(),
	        dto.getArrival(),
	        dto.getPrice(),
	        dto.getAvailability(),
	        dto.getDepartureDate() // ✅ Add this
	    );
	}

	public static FlightDto toDto(Flight flight) {
	    return new FlightDto(
	        flight.getFlightID(),
	        flight.getAirline(),
	        flight.getDeparture(),
	        flight.getArrival(),
	        flight.getPrice(),
	        flight.isAvailability(),
	        flight.getDepartureDate() // ✅ Add this
	    );
	}

}