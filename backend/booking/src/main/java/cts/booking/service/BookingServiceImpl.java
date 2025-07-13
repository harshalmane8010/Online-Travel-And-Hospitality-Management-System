package cts.booking.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cts.booking.FlightClient;
import cts.booking.HotelClient;
import cts.booking.PackageClient;
import cts.booking.entity.Booking;
import cts.booking.exception.BookingNotFoundException;
import cts.booking.exception.InvalidBookingTypeException;
import cts.booking.model.FlightDto;
import cts.booking.model.HotelDto;
import cts.booking.model.PackageDto;
import cts.booking.repository.BookingRepository;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private FlightClient flightClient;

    @Autowired
    private HotelClient hotelClient;

    @Autowired
    private PackageClient packageClient;

    @Override
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public Optional<Booking> getBookingById(int id) {
        return bookingRepository.findById(id);
    }

    @Override
    public Booking createBooking(Booking booking) {
        String type = booking.getType();

        switch (type.toLowerCase()) {
            case "hotel":
                HotelDto hotelDto = fetchHotelDetails(booking.getHotelId());
                if (hotelDto.getRoomsAvailable() < booking.getRoomsBooked()) {
                    throw new IllegalArgumentException("Not enough rooms available");
                }
                hotelDto.setRoomsAvailable(hotelDto.getRoomsAvailable() - booking.getRoomsBooked());
                hotelClient.updateHotelRooms(hotelDto.getHotelId(), hotelDto.getRoomsAvailable());
                break;

            case "flight":
                if (booking.getFlightId() == null) {
                    throw new IllegalArgumentException("Flight ID must be provided for flight bookings");
                }
                FlightDto flightDto = fetchFlightDetails(booking.getFlightId());
                // Add flight validation logic if needed
                break;

            case "package":
                PackageDto packageDto = fetchPackageDetails(booking.getPackageId());
                if (packageDto == null) {
                    throw new IllegalArgumentException("Package not found");
                }
                // Add additional validations if needed
                break;

            default:
                throw new InvalidBookingTypeException("Booking type must be 'Hotel', 'Flight', or 'Package'");
        }

        return bookingRepository.save(booking);
    }

    @Override
    public Booking updateBooking(int id, Booking bookingDetails) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new BookingNotFoundException("Booking not found with ID: " + id));

        String type = bookingDetails.getType();
        if (!type.equalsIgnoreCase("hotel") &&
            !type.equalsIgnoreCase("flight") &&
            !type.equalsIgnoreCase("package")) {
            throw new InvalidBookingTypeException("Booking type must be 'Hotel', 'Flight', or 'Package'");
        }

        booking.setUserID(bookingDetails.getUserID());
        booking.setType(bookingDetails.getType());
        booking.setStatus(bookingDetails.getStatus());
        booking.setPaymentID(bookingDetails.getPaymentID());
        booking.setBookingDate(bookingDetails.getBookingDate());
        booking.setHotelId(bookingDetails.getHotelId());
        booking.setRoomsBooked(bookingDetails.getRoomsBooked());
        booking.setPackageId(bookingDetails.getPackageId());
        booking.setFlightId(bookingDetails.getFlightId());

        return bookingRepository.save(booking);
    }

    @Override
    public void deleteBooking(int id) {
        bookingRepository.deleteById(id);
    }

    public HotelDto fetchHotelDetails(Long hotelId) {
        return hotelClient.getHotelById(hotelId);
    }

    public FlightDto fetchFlightDetails(Long flightId) {
        return flightClient.getFlightById(flightId);
    }

    public PackageDto fetchPackageDetails(Long packageId) {
        return packageClient.getPackageById(packageId);
    }
}
