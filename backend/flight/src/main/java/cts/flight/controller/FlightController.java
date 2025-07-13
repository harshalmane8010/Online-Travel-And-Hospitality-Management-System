package cts.flight.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cts.flight.entity.Flight;
import cts.flight.mapper.FlightMapper;
import cts.flight.model.FlightDto;
//import cts.flight.repository.FlightRepository;
import cts.flight.repository.FlightRepository;
import cts.flight.service.FlightService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/flights")
public class FlightController {

    @Autowired
    private FlightService flightService;

    @Autowired
    private FlightRepository flightRepository;

    @GetMapping
    public List<FlightDto> getAllFlights() {
        return flightService.getAllFlights().stream()
                .map(FlightMapper::toDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FlightDto> getFlightById(@PathVariable Long id) {
        return flightService.getFlightById(id)
                .map(FlightMapper::toDto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<FlightDto> createFlight(@Valid @RequestBody FlightDto flightDto) {
        Flight created = flightService.createFlight(FlightMapper.toEntity(flightDto));
        return ResponseEntity.ok(FlightMapper.toDto(created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<FlightDto> updateFlight(@PathVariable Long id, @Valid @RequestBody FlightDto flightDto) {
        Flight updated = flightService.updateFlight(id, FlightMapper.toEntity(flightDto));
        return ResponseEntity.ok(FlightMapper.toDto(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFlight(@PathVariable Long id) {
        flightService.deleteFlight(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public List<FlightDto> searchFlights(@RequestParam String departure, @RequestParam String arrival) {
        return flightService.searchFlights(departure, arrival).stream()
                .map(FlightMapper::toDto)
                .collect(Collectors.toList());
    }
//
//@GetMapping("/airline")
//public List<Flight> getByAirline(@RequestParam String airline) {
//   return flightRepository.findByAirlineContainingIgnoreCase(airline);
//}
    @GetMapping("/airline")
    public List<Flight> getByAirline(@RequestParam String airline) {
        return flightRepository.findByAirlineContainingIgnoreCase(airline);
    }

    
}
