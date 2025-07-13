
package cts.booking.mapper;

import cts.booking.entity.Booking;
import cts.booking.model.BookingDto;

public class BookingMapper {
    public static Booking toEntity(BookingDto dto) {
        return new Booking(
            dto.getBookingId(),
            dto.getUserId().intValue(),
            dto.getType(),
            dto.getStatus(),
            dto.getPaymentId().intValue(),
            dto.getBookingDate(),
            dto.getHotelId(),
            dto.getRoomsBooked(),
            dto.getFlightId(),// ✅ map flightId
            dto.getPackageId()
        );
    }

    public static BookingDto toDto(Booking booking) {
        return new BookingDto(
            booking.getBookingID(),
            (long) booking.getUserID(),
            booking.getType(),
            booking.getStatus(),
            (long) booking.getPaymentID(),
            booking.getBookingDate(),
            booking.getHotelId(),
            booking.getRoomsBooked(),
            booking.getFlightId(),// ✅ map flightId
            booking.getPackageId()
        		);
    }
}
