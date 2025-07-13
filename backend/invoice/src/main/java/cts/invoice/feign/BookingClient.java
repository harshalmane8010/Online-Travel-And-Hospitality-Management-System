package cts.invoice.feign;

import cts.invoice.model.BookingDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@FeignClient(name = "BOOKING-SERVICE")
public interface BookingClient {

    @GetMapping("/bookings/{id}")
    BookingDto getBookingById(@PathVariable("id") Long bookingId);
    
}
