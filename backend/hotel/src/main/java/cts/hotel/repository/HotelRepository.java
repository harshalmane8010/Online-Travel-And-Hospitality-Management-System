package cts.hotel.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import cts.hotel.entity.Hotel;

public interface HotelRepository extends JpaRepository<Hotel, Long> {

	List<Hotel> findByRoomsAvailableGreaterThanEqual(int roomsAvailable);

	@Query("SELECT h FROM Hotel h WHERE " + "(:location IS NULL OR h.location = :location) AND "
			+ "(:minRating IS NULL OR h.rating >= :minRating) AND "
			+ "(:maxPrice IS NULL OR h.pricePerNight <= :maxPrice)")
	List<Hotel> searchHotels(@Param("location") String location, @Param("minRating") Double minRating,
			@Param("maxPrice") Double maxPrice);

}
