package cts.hotel.controller;

import cts.hotel.entity.Hotel;
import cts.hotel.exception.HotelNotFoundException;
import cts.hotel.model.HotelDto;
import cts.hotel.mapper.HotelMapper;
import cts.hotel.service.HotelService;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.MediaType;


@RestController
@RequestMapping("/hotels")
public class HotelController {

	@Autowired
	private HotelService hotelService;

	@GetMapping
	public List<HotelDto> getAllHotels() {
		return hotelService.getAllHotels().stream().map(HotelMapper::toDto).collect(Collectors.toList());
	}

	@GetMapping("/{id}")
	public ResponseEntity<HotelDto> getHotelById(@PathVariable Long id) {
		return hotelService.getHotelById(id).map(HotelMapper::toDto).map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}

	@PostMapping
	public ResponseEntity<HotelDto> createHotel(@Valid @RequestBody HotelDto hotelDto) {
		Hotel created = hotelService.createHotel(HotelMapper.toEntity(hotelDto));
		return ResponseEntity.ok(HotelMapper.toDto(created));
	}

	@PutMapping("/{id}")
	public ResponseEntity<HotelDto> updateHotel(@PathVariable Long id, @Valid @RequestBody HotelDto hotelDto) {
		Hotel updated = hotelService.updateHotel(id, HotelMapper.toEntity(hotelDto));
		return ResponseEntity.ok(HotelMapper.toDto(updated));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteHotel(@PathVariable Long id) {
		hotelService.deleteHotel(id);
		return ResponseEntity.noContent().build();
	}

	@GetMapping("/available")
	public List<HotelDto> getAvailableHotels() {
		return hotelService.getAvailableHotels().stream().map(HotelMapper::toDto).collect(Collectors.toList());
	}

	@GetMapping("/search")
	public List<HotelDto> searchHotels(@RequestParam(required = false) String location,
			@RequestParam(required = false) Double minRating, @RequestParam(required = false) Double maxPrice) {
		return hotelService.searchHotels(location, minRating, maxPrice).stream().map(HotelMapper::toDto)
				.collect(Collectors.toList());
	}

	@PutMapping("/{id}/rating")
	public ResponseEntity<Void> updateHotelRating(@PathVariable Long id, @RequestParam double rating) {
		Hotel hotel = hotelService.getHotelById(id)
				.orElseThrow(() -> new HotelNotFoundException("Hotel not found with ID: " + id));
		hotel.setRating(rating);
		hotelService.updateHotel(id, hotel);
		return ResponseEntity.ok().build();
}


	@PutMapping("/{id}/rooms")
	public ResponseEntity<Void> updateHotelRooms(@PathVariable Long id, @RequestParam int roomsAvailable) {
		Hotel hotel = hotelService.getHotelById(id)
				.orElseThrow(() -> new HotelNotFoundException("Hotel not found with ID: " + id));
		hotel.setRoomsAvailable(roomsAvailable);
		hotelService.updateHotel(id, hotel);
		return ResponseEntity.ok().build();
	}
//	@PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//	public ResponseEntity<Map<String, String>> uploadImage(@RequestParam("image") MultipartFile file) {
//	   
//		 System.out.println("➡️ Upload endpoint hit");
//		    System.out.println("File name: " + file.getOriginalFilename());
//		    System.out.println("File size: " + file.getSize());
//		String imageUrl = hotelService.storeImage(file);
//	    return ResponseEntity.ok(Map.of("url", imageUrl));
//	}
	@PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<Map<String, String>> uploadImage(@RequestParam("image") MultipartFile file) {
	    System.out.println("🛬 Controller received image: " + file.getOriginalFilename());
	    String imageUrl = hotelService.storeImage(file);
	    return ResponseEntity.ok(Map.of("url", imageUrl));
	}




}
