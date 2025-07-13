package com.cts.ops.service;

import com.cts.ops.entity.OffersEntity;
import com.cts.ops.model.OffersDto;
import java.util.List;

public interface OffersService {
   
	List<OffersEntity> getAllOffers();
    List<OffersEntity> getActiveOffers();
    List<OffersEntity> getOffersByType(String type);
    OffersEntity createOffer(OffersDto dto);
    OffersEntity getOfferById(int id);
    OffersEntity updateOffer(int id, OffersDto dto);
    void deleteOffer(int id);
    
    
}