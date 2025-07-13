package com.cts.package_service.service;
import java.util.List;

//import org.springframework.web.multipart.MultipartFile;

import com.cts.package_service.model.PackageDTO;

public interface PackageService {
    List<PackageDTO> getAllPackages();
    PackageDTO getPackageById(Long id);
    PackageDTO createPackage(PackageDTO packageDTO);
    PackageDTO updatePackage(Long id, PackageDTO packageDTO);
    void deletePackage(Long id);
//    String storeImage(MultipartFile file);
    
    
}
