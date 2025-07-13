package cts.hotel.service;

import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import cts.hotel.entity.Hotel;

public interface HotelService {
	List<Hotel> getAllHotels();

	Optional<Hotel> getHotelById(Long id);

	Hotel createHotel(Hotel hotel);

	Hotel updateHotel(Long id, Hotel hotelDetails);

	void deleteHotel(Long id);

	List<Hotel> getAvailableHotels();

	List<Hotel> searchHotels(String location, Double minRating, Double maxPrice);
	String storeImage(MultipartFile file);
}
