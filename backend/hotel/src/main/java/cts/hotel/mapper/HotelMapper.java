package cts.hotel.mapper;

import cts.hotel.entity.Hotel;
import cts.hotel.model.HotelDto;

public class HotelMapper {

    public static Hotel toEntity(HotelDto dto) {
        return new Hotel(dto.getHotelId(), dto.getName(), dto.getLocation(), dto.getRoomsAvailable(), dto.getRating(),
                dto.getPricePerNight(), dto.getUrl());
    }
    public static HotelDto toDto(Hotel hotel) {
        return new HotelDto(hotel.getHotelID(), hotel.getName(), hotel.getLocation(), hotel.getRoomsAvailable(),
                hotel.getRating(), hotel.getPricePerNight(), hotel.getUrl());
    }

}
