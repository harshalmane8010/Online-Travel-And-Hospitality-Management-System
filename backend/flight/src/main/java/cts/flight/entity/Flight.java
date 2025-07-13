package cts.flight.entity;


import java.time.LocalDate;

import cts.flight.entity.Flight;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Flight {
	@Id
	private Long flightID;

	    private String airline;
	    private String departure;
	    private String arrival;
	    private double price;
	    private boolean availability;
	    private LocalDate departureDate;



}
