package com.cts.package_service.controller;

import com.cts.package_service.model.PackageDTO;
import com.cts.package_service.service.PackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.Valid;
import java.util.List;
//import java.util.Map;


//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/packages")
public class PackageController {

    @Autowired
    private PackageService packageService;

    @GetMapping
    public ResponseEntity<List<PackageDTO>> getAllPackages() {
        return ResponseEntity.ok(packageService.getAllPackages());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PackageDTO> getPackageById(@PathVariable Long id) {
        return ResponseEntity.ok(packageService.getPackageById(id));
    }

    @PostMapping
    public ResponseEntity<PackageDTO> createPackage(@Valid @RequestBody PackageDTO packageDTO) {
        return ResponseEntity.ok(packageService.createPackage(packageDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PackageDTO> updatePackage(@PathVariable Long id, @Valid @RequestBody PackageDTO packageDTO) {
        return ResponseEntity.ok(packageService.updatePackage(id, packageDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePackage(@PathVariable Long id) {
        packageService.deletePackage(id);
        return ResponseEntity.noContent().build();
    }
//	@PostMapping("/upload")
//    public ResponseEntity<Map<String, String>> uploadImage(@RequestParam("image") MultipartFile file) {
//        String imageUrl = packageService.storeImage(file);
//        return ResponseEntity.ok(Map.of("url", imageUrl));
//	}
 
 
}
