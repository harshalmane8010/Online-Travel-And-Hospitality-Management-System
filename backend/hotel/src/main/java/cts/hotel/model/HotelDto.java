package cts.hotel.model;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HotelDto {

	@NotNull(message = "Hotel ID is required")
	private Long hotelId;

	@NotBlank(message = "Hotel name is required")
	private String name;

	@NotBlank(message = "Location is required")
	private String location;

	@NotNull(message = "Rooms available is required")
	@Min(value = 0, message = "Rooms available cannot be negative")
	private Integer roomsAvailable;

	private Double rating;

	@NotNull(message = "Price per night is required")
	@Positive(message = "Price per night must be greater than 0")
	private Double pricePerNight;
	
//	@NotBlank(message = "Image url")
	private String url;

}
