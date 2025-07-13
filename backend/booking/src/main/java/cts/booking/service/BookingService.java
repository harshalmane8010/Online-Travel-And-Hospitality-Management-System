package cts.booking.service;

import java.util.List;
import java.util.Optional;

import cts.booking.entity.Booking;
import cts.booking.model.FlightDto;
import cts.booking.model.HotelDto;
import cts.booking.model.PackageDto;

public interface BookingService {
    List<Booking> getAllBookings();
    Optional<Booking> getBookingById(int id);
    Booking createBooking(Booking booking);
    Booking updateBooking(int id, Booking bookingDetails);
    void deleteBooking(int id);

    // ✅ Add this method
    HotelDto fetchHotelDetails(Long id);
    FlightDto fetchFlightDetails(Long id);
    PackageDto fetchPackageDetails(Long packageId); 


}
