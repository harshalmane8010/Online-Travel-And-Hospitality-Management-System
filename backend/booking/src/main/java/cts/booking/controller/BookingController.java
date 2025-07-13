package cts.booking.controller;

//package cts.hfbs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import cts.booking.entity.Booking;
import cts.booking.mapper.BookingMapper;
import cts.booking.model.BookingDto;
import cts.booking.model.FlightDto;
import cts.booking.model.HotelDto;
import cts.booking.model.PackageDto;
import cts.booking.service.BookingService;
import jakarta.validation.Valid;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;


@GetMapping("/hotels/{id}")
public ResponseEntity<HotelDto> getHotelDetails(@PathVariable Long id) {
HotelDto hotel = bookingService.fetchHotelDetails(id);
return ResponseEntity.ok(hotel);
}

    // GET /bookings - Get all bookings
    @GetMapping
    public ResponseEntity<List<BookingDto>> getAllBookings() {
        List<BookingDto> bookingDtos = bookingService.getAllBookings().stream()
            .map(BookingMapper::toDto)
            .collect(Collectors.toList());
        return ResponseEntity.ok(bookingDtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookingDto> getBookingById(@PathVariable int id) {
        return bookingService.getBookingById(id)
            .map(BookingMapper::toDto)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    
    @PostMapping
    public ResponseEntity<BookingDto> createBooking(@Valid @RequestBody BookingDto bookingDto) {
        Booking booking = BookingMapper.toEntity(bookingDto);
        Booking created = bookingService.createBooking(booking);
        return new ResponseEntity<>(BookingMapper.toDto(created), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookingDto> updateBooking(@PathVariable int id, @Valid @RequestBody BookingDto bookingDto) {
        try {
            Booking updated = bookingService.updateBooking(id, BookingMapper.toEntity(bookingDto));
            return ResponseEntity.ok(BookingMapper.toDto(updated));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }


    // DELETE /bookings/{id} - Delete booking
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable int id) {
        bookingService.deleteBooking(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/flights/{id}")
    public ResponseEntity<FlightDto> getFlightDetails(@PathVariable Long id) {
        FlightDto flight = bookingService.fetchFlightDetails(id);
        return ResponseEntity.ok(flight);
    }
    @GetMapping("/packages/{id}")
    public ResponseEntity<PackageDto> getPackageDetails(@PathVariable Long id) {
        PackageDto travelPackage = bookingService.fetchPackageDetails(id);
        return ResponseEntity.ok(travelPackage);
    }

}
