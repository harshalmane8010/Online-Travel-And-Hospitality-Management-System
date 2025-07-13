package cts.flight.service;

import java.util.List;
import java.util.Optional;

import cts.flight.entity.Flight;

public interface FlightService {
    List<Flight> getAllFlights();
    Optional<Flight> getFlightById(Long id);
    Flight createFlight(Flight flight);
    Flight updateFlight(Long id, Flight flightDetails);
    void deleteFlight(Long id);
    List<Flight> searchFlights(String departure, String arrival);

//    public Flight updateFlight(Long id, Flight flightDetails)

}