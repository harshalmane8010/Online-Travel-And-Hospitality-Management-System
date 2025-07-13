package cts.hotel.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import cts.hotel.entity.Hotel;
import cts.hotel.exception.HotelNotFoundException;
import cts.hotel.repository.HotelRepository;

@Service
public class HotelServiceImpl implements HotelService {

    private static final String UPLOAD_DIR = "Uploads/";

    @Autowired
    private HotelRepository hotelRepository;

    @Override
    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }

    @Override
    public Optional<Hotel> getHotelById(Long id) {
        return hotelRepository.findById(id);
    }

    @Override
    public Hotel updateHotel(Long id, Hotel hotelDetails) {
        Hotel hotel = hotelRepository.findById(id)
                .orElseThrow(() -> new HotelNotFoundException("Hotel not found with ID: " + id));

        hotel.setName(hotelDetails.getName());
        hotel.setLocation(hotelDetails.getLocation());
        hotel.setRoomsAvailable(hotelDetails.getRoomsAvailable());
        hotel.setRating(hotelDetails.getRating());
        hotel.setPricePerNight(hotelDetails.getPricePerNight());
        hotel.setUrl(hotelDetails.getUrl());
        return hotelRepository.save(hotel);
    }

    @Override
    public void deleteHotel(Long id) {
        hotelRepository.deleteById(id);
    }

    @Override
    public List<Hotel> getAvailableHotels() {
        return hotelRepository.findByRoomsAvailableGreaterThanEqual(1);
    }

    @Override
    public List<Hotel> searchHotels(String location, Double minRating, Double maxPrice) {
        return hotelRepository.searchHotels(location, minRating, maxPrice);
    }

    @Override
    public Hotel createHotel(Hotel hotel) {
        if (hotel.getRating() == null) {
            hotel.setRating(0.0);
        }
        return hotelRepository.save(hotel);
    }

    @Override
    public String storeImage(MultipartFile file) {
        System.out.println("➡️ Image upload triggered.");
        try {
            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) {
                System.out.println("📂 Creating Uploads directory.");
                uploadDir.mkdirs();
            }

            String originalFilename = file.getOriginalFilename();
            if (originalFilename == null || originalFilename.isBlank()) {
                throw new RuntimeException("Invalid file name");
            }

            String filename = UUID.randomUUID() + "_" + originalFilename;
            Path filePath = Paths.get(UPLOAD_DIR).resolve(filename).normalize();
            System.out.println("📝 Saving to path: " + filePath);

            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("✅ Image saved successfully.");

            return "http://localhost:9999/uploads/" + filename;

        } catch (IOException e) {
            System.out.println("❌ Failed to upload image: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to store image", e);
        }
    }
}
