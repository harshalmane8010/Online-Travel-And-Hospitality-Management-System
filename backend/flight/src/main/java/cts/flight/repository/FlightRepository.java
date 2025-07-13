package cts.flight.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

//import cts.hfbs.entity.Flight;
import org.springframework.stereotype.Repository;

import cts.flight.entity.Flight;

@Repository
public interface FlightRepository extends JpaRepository<Flight, Long> {
	List<Flight> findByDepartureContainingIgnoreCaseAndArrivalContainingIgnoreCase(String departure, String arrival);
	 List<Flight> findByAirlineContainingIgnoreCase(String airline); // ✅ THIS LINE
}