package cts.flight.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cts.flight.entity.Flight;
import cts.flight.repository.FlightRepository;
import cts.flight.exception.FlightNotFoundException;
import cts.flight.service.FlightService;

@Service
public class FlightServiceImpl implements FlightService {

    @Autowired
    private FlightRepository flightRepository;

    @Override
    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    @Override
    public Optional<Flight> getFlightById(Long id) {
        return flightRepository.findById(id);
    }

    @Override
    public Flight createFlight(Flight flight) {
        return flightRepository.save(flight);
    }


@Override
public Flight updateFlight(Long id, Flight flightDetails) {
	Flight flight = flightRepository.findById(id)
			.orElseThrow(() -> new FlightNotFoundException("Flight not found with ID: " + id));
        flight.setAirline(flightDetails.getAirline());
        flight.setDeparture(flightDetails.getDeparture());
        flight.setArrival(flightDetails.getArrival());
        flight.setPrice(flightDetails.getPrice());
        flight.setAvailability(flightDetails.isAvailability());
        return flightRepository.save(flight);
    }

    
    @Override
    public List<Flight> searchFlights(String departure, String arrival) {
        return flightRepository.findByDepartureContainingIgnoreCaseAndArrivalContainingIgnoreCase(departure, arrival);
    }
    
    @Override
    public void deleteFlight(Long id) {
        flightRepository.deleteById(id);
    }
    
}