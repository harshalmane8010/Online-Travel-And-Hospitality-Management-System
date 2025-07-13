
package cts.booking.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class HotelDto {

	private Long hotelId; // ✅ Rename from 'id' to 'hotelId'
    private String name;
    private String location;
    private int roomsAvailable;
    private double rating;
    private double pricePerNight;
}
