package com.cts.package_service.service;

import com.cts.package_service.client.ItineraryClient;
import com.cts.package_service.entity.Package;
import com.cts.package_service.exception.ResourceNotFoundException;
import com.cts.package_service.mapper.PackageMapper;
import com.cts.package_service.model.PackageDTO;
import com.cts.package_service.repository.PackageRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
public class PackageServiceImplTest {

    @InjectMocks
    private PackageServiceImpl packageService;

    @Mock
    private PackageRepository packageRepository;

    @Mock
    private PackageMapper packageMapper;

    @Mock
    private ItineraryClient itineraryClient;

    private Package samplePackage;
    private PackageDTO sampleDTO;

    @BeforeEach
    void setUp() {
        samplePackage = new Package();
        samplePackage.setPackageID(1L);
        samplePackage.setName("Test Package");

        sampleDTO = new PackageDTO();
        sampleDTO.setPackageID(1L);
        sampleDTO.setName("Test Package");
    }

    @Test
    void testGetAllPackages() {
        when(packageRepository.findAll()).thenReturn(List.of(samplePackage));
        when(packageMapper.toDTO(samplePackage)).thenReturn(sampleDTO);
        when(itineraryClient.getItineraryIdsByPackageId(1L)).thenReturn(List.of(101L, 102L));

        List<PackageDTO> result = packageService.getAllPackages();

        assertEquals(1, result.size());
        assertEquals("Test Package", result.get(0).getName());
        assertEquals(List.of(101L, 102L), result.get(0).getItineraryIDs());
    }

    @Test
    void testGetPackageById_Found() {
        when(packageRepository.findById(1L)).thenReturn(Optional.of(samplePackage));
        when(packageMapper.toDTO(samplePackage)).thenReturn(sampleDTO);
        when(itineraryClient.getItineraryIdsByPackageId(1L)).thenReturn(List.of(101L));

        PackageDTO result = packageService.getPackageById(1L);

        assertEquals("Test Package", result.getName());
        assertEquals(List.of(101L), result.getItineraryIDs());
    }

    @Test
    void testGetPackageById_NotFound() {
        when(packageRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> packageService.getPackageById(1L));
    }

    @Test
    void testCreatePackage() {
        when(packageMapper.toEntity(sampleDTO)).thenReturn(samplePackage);
        when(packageRepository.save(samplePackage)).thenReturn(samplePackage);
        when(packageMapper.toDTO(samplePackage)).thenReturn(sampleDTO);

        PackageDTO result = packageService.createPackage(sampleDTO);

        assertEquals("Test Package", result.getName());
    }

    @Test
    void testUpdatePackage_Found() {
        when(packageRepository.findById(1L)).thenReturn(Optional.of(samplePackage));
        when(packageRepository.save(samplePackage)).thenReturn(samplePackage);
        when(packageMapper.toDTO(samplePackage)).thenReturn(sampleDTO);

        PackageDTO result = packageService.updatePackage(1L, sampleDTO);

        assertEquals("Test Package", result.getName());
    }

    @Test
    void testUpdatePackage_NotFound() {
        when(packageRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> packageService.updatePackage(1L, sampleDTO));
    }

    @Test
    void testDeletePackage() {
        doNothing().when(packageRepository).deleteById(1L);

        packageService.deletePackage(1L);

        verify(packageRepository, times(1)).deleteById(1L);
    }
}
