//package cts.payment.feign;
//
//import cts.payment.model.BookingDto;
//import org.springframework.cloud.openfeign.FeignClient;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//
//This name must match the Booking service's Eureka registration name
//@FeignClient(name = "booking")
//public interface BookingFeignClient {
//
//    @GetMapping("/bookings/{id}")
//    BookingDto getBookingById(@PathVariable("id") Long bookingId);
//}
