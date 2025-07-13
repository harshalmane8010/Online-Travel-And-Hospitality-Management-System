package cts.hotel.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Hotel {
	@Id
	private Long hotelID;
	private String name;
	private String location;
	private int roomsAvailable;
	private Double rating;
	private double pricePerNight;
	private String url;

}
