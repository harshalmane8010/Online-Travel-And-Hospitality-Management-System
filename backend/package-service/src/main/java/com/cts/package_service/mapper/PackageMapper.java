package com.cts.package_service.mapper;

import com.cts.package_service.entity.Package;
import com.cts.package_service.model.PackageDTO;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class PackageMapper {

    @Autowired
    private ModelMapper modelMapper;

    private final ObjectMapper objectMapper = new ObjectMapper();

    public PackageDTO toDTO(Package travelPackage) {
        PackageDTO dto = modelMapper.map(travelPackage, PackageDTO.class);
        try {
            if (travelPackage.getActivities() != null) {
                Map<String, String> activitiesMap = objectMapper.readValue(
                    travelPackage.getActivities(), new TypeReference<Map<String, String>>() {});
                dto.setActivities(activitiesMap);
            }
        } catch (Exception e) {
            System.err.println("Error parsing activities JSON: " + e.getMessage());
            dto.setActivities(null);
        }
        return dto;
    }


    public Package toEntity(PackageDTO dto) {
        Package entity = modelMapper.map(dto, Package.class);
        try {
            if (dto.getActivities() != null) {
                String activitiesJson = objectMapper.writeValueAsString(dto.getActivities());
                entity.setActivities(activitiesJson);
            }
        } catch (Exception e) {
            System.err.println("Error serializing activities map: " + e.getMessage());
            entity.setActivities(null);
        }
        return entity;
    }
}
