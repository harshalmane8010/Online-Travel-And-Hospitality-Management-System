package com.cts.itinerary_service.mapper;

import com.cts.itinerary_service.entity.Itinerary;
import com.cts.itinerary_service.model.ItineraryDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ItineraryMapper {

    @Autowired
    private ModelMapper modelMapper;

    public ItineraryDTO toDTO(Itinerary itinerary) {
        return modelMapper.map(itinerary, ItineraryDTO.class);
    }

    public Itinerary toEntity(ItineraryDTO dto) {
        return modelMapper.map(dto, Itinerary.class);
    }
}
