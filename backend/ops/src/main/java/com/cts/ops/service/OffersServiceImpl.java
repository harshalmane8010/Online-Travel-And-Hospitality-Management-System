package com.cts.ops.service;

import com.cts.ops.entity.OffersEntity;
import com.cts.ops.exception.OfferNotFoundException;
import com.cts.ops.model.OffersDto;
import com.cts.ops.repository.OffersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class OffersServiceImpl implements OffersService {

    @Autowired
    private OffersRepository offersRepository;

    @Override
    public List<OffersEntity> getAllOffers() {
        return offersRepository.findAll();
    }

    @Override
    public List<OffersEntity> getActiveOffers() {
        LocalDate today = LocalDate.now();
        return offersRepository.findByStartDateBeforeAndEndDateAfter(today, today);
    }

    @Override
    public List<OffersEntity> getOffersByType(String type) {
        return offersRepository.findByApplicableTo(type);
    }

    @Override
    public OffersEntity createOffer(OffersDto dto) {

        OffersEntity entity = new OffersEntity();
        entity.setTitle(dto.getTitle());
        entity.setDescription(dto.getDescription());
        entity.setDiscountPercentage(dto.getDiscountPercentage());
        entity.setStartDate(dto.getStartDate());
        entity.setEndDate(dto.getEndDate());
        entity.setApplicableTo(dto.getApplicableTo());
        return offersRepository.save(entity);

    }
    
    @Override
    public OffersEntity updateOffer(int id, OffersDto dto) {
        OffersEntity existing = offersRepository.findById(id)
                .orElseThrow(() -> new OfferNotFoundException("Offer with ID " + id + " not found"));
        existing.setTitle(dto.getTitle());
        existing.setDescription(dto.getDescription());
        existing.setDiscountPercentage(dto.getDiscountPercentage());
        existing.setStartDate(dto.getStartDate());
        existing.setEndDate(dto.getEndDate());
        existing.setApplicableTo(dto.getApplicableTo());
        return offersRepository.save(existing);
    }

    @Override
    public void deleteOffer(int id) {
        OffersEntity offer = offersRepository.findById(id)
                .orElseThrow(() -> new OfferNotFoundException("Offer with ID " + id + " not found"));
        offersRepository.delete(offer);
    }

    
    @Override
    public OffersEntity getOfferById(int id) {
       return offersRepository.findById(id)
               .orElseThrow(() -> new OfferNotFoundException("Offer with ID " + id + " not found"));
    }
    
}
 
