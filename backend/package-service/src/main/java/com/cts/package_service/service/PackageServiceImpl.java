package com.cts.package_service.service;

import com.cts.package_service.client.ItineraryClient;
import com.cts.package_service.entity.Package;
import com.cts.package_service.exception.ResourceNotFoundException;
import com.cts.package_service.mapper.PackageMapper;
import com.cts.package_service.model.PackageDTO;
import com.cts.package_service.repository.PackageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.File;
//import java.io.IOException;
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.nio.file.Paths;
//import java.nio.file.StandardCopyOption;
import java.util.Collections;
import java.util.List;
//import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PackageServiceImpl implements PackageService {
//	private static final String UPLOAD_DIR = "Uploads/";

    @Autowired
    private PackageRepository packageRepository;

    @Autowired
    private PackageMapper packageMapper;

    @Autowired(required = false)
    private ItineraryClient itineraryClient;

    @Override
    public List<PackageDTO> getAllPackages() {
        return packageRepository.findAll().stream()
                .map(this::mapWithItineraries)
                .collect(Collectors.toList());
    }

    @Override
    public PackageDTO getPackageById(Long id) {
        Package travelPackage = packageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Package not found with ID: " + id));
        return mapWithItineraries(travelPackage);
    }

    @Override
    public PackageDTO createPackage(PackageDTO dto) {
        Package travelPackage = packageMapper.toEntity(dto);
        Package saved = packageRepository.save(travelPackage);
        return packageMapper.toDTO(saved);
    }

    @Override
    public PackageDTO updatePackage(Long id, PackageDTO dto) {
        Package existing = packageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Package not found with ID: " + id));

        Package updatedPackage = packageMapper.toEntity(dto);
        updatedPackage.setPackageID(existing.getPackageID());

        Package updated = packageRepository.save(updatedPackage);
        return packageMapper.toDTO(updated);
    }

    @Override
    public void deletePackage(Long id) {
        packageRepository.deleteById(id);
    }

    private PackageDTO mapWithItineraries(Package travelPackage) {
        PackageDTO dto = packageMapper.toDTO(travelPackage);

        try {
            List<Long> itineraryIds = itineraryClient != null
                    ? itineraryClient.getItineraryIdsByPackageId(travelPackage.getPackageID())
                    : Collections.emptyList();
            dto.setItineraryIDs(itineraryIds);
        } catch (Exception ex) {
            System.err.println("Warning: Could not fetch itineraries for package ID " + travelPackage.getPackageID());
            dto.setItineraryIDs(Collections.emptyList());
        }

        return dto;
    }
//    public String storeImage(MultipartFile file) {
//        try {
//            File uploadDir = new File(UPLOAD_DIR);
//            if (!uploadDir.exists()) {
//                uploadDir.mkdirs();
//            }
// 
//            String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
//            Path filePath = (Path) Paths.get(UPLOAD_DIR, filename);
//            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
// 
//            return "http://localhost:8082/" + filename;
// 
//        } catch (IOException e) {
//            throw new RuntimeException("Failed to store image", e);
//        }
//    }
}
