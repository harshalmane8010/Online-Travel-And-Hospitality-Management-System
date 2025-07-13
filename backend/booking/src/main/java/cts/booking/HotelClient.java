package cts.booking;

import cts.booking.model.HotelDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "HOTEL-SERVICE") // This should match the hotel service's spring.application.name
public interface HotelClient {
    @GetMapping("/hotels/{id}")
    HotelDto getHotelById(@PathVariable("id") Long id);
    
    @PutMapping("/hotels/{id}/rooms")
    void updateHotelRooms(@PathVariable Long id, @RequestParam int roomsAvailable);

}
