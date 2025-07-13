package com.cts.package_service.controller;

import com.cts.package_service.model.PackageDTO;
import com.cts.package_service.service.PackageService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class PackageControllerTest {

    @Mock
    private PackageService packageService;

    @InjectMocks
    private PackageController packageController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllPackages() {
        PackageDTO dto1 = new PackageDTO();
        dto1.setPackageID(1L);
        dto1.setName("Package A");

        PackageDTO dto2 = new PackageDTO();
        dto2.setPackageID(2L);
        dto2.setName("Package B");

        when(packageService.getAllPackages()).thenReturn(Arrays.asList(dto1, dto2));

        ResponseEntity<List<PackageDTO>> response = packageController.getAllPackages();

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(2, response.getBody().size());
        assertEquals("Package A", response.getBody().get(0).getName());
        assertEquals("Package B", response.getBody().get(1).getName());
        verify(packageService, times(1)).getAllPackages();
    }

    @Test
    void testGetPackageById() {
        PackageDTO dto = new PackageDTO();
        dto.setPackageID(1L);
        dto.setName("Package A");

        when(packageService.getPackageById(1L)).thenReturn(dto);

        ResponseEntity<PackageDTO> response = packageController.getPackageById(1L);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Package A", response.getBody().getName());
    }

    @Test
    void testCreatePackage() {
        PackageDTO dto = new PackageDTO();
        dto.setName("New Package");

        when(packageService.createPackage(dto)).thenReturn(dto);

        ResponseEntity<PackageDTO> response = packageController.createPackage(dto);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("New Package", response.getBody().getName());
    }

    @Test
    void testUpdatePackage() {
        PackageDTO dto = new PackageDTO();
        dto.setName("Updated Package");

        when(packageService.updatePackage(1L, dto)).thenReturn(dto);

        ResponseEntity<PackageDTO> response = packageController.updatePackage(1L, dto);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Updated Package", response.getBody().getName());
    }

    @Test
    void testDeletePackage() {
        doNothing().when(packageService).deletePackage(1L);

        ResponseEntity<Void> response = packageController.deletePackage(1L);

        assertEquals(204, response.getStatusCodeValue());
        verify(packageService, times(1)).deletePackage(1L);
    }
}
