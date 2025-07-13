
package cts.booking.entity;

import java.time.LocalDate;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Booking {
    @Id
    private Long bookingID;
    private int userID;
    private String type;
    private String status;
    private int paymentID;
    private LocalDate bookingDate;

    private Long hotelId;       // Only used if type == "Hotel"
    private Integer roomsBooked; // Only used if type == "Hotel"

    private Long flightId;      // ✅ Only used if type == "Flight"
    private Long packageId; // Only used if type == "TravelPackage"


    
}
