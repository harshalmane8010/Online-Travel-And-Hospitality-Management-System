package com.cts.ops.service;

import com.cts.ops.entity.PromotionsEntity;
import com.cts.ops.exception.PromotionNotFoundException;
import com.cts.ops.model.PromotionsDto;
import com.cts.ops.repository.PromotionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PromotionsServiceImpl implements PromotionsService {

    @Autowired
    private PromotionsRepository promotionsRepository;

    @Override
    public List<PromotionsEntity> getAllPromotions() {
        return promotionsRepository.findAll();

    }
    @Override
    public PromotionsEntity createPromotion(PromotionsDto dto) {
        PromotionsEntity entity = new PromotionsEntity();
        entity.setTitle(dto.getTitle());
        entity.setDescription(dto.getDescription());
        entity.setDiscountAmount(dto.getDiscountAmount());
        entity.setValidFrom(dto.getValidFrom());
        entity.setValidTo(dto.getValidTo());
        entity.setApplicableFor(dto.getApplicableFor());
        return promotionsRepository.save(entity);

    }
    
    @Override
    public PromotionsEntity updatePromotion(int id, PromotionsDto dto) {
        PromotionsEntity existing = promotionsRepository.findById(id)
                .orElseThrow(() -> new PromotionNotFoundException("Promotion with ID " + id + " not found"));
        existing.setTitle(dto.getTitle());
        existing.setDescription(dto.getDescription());
        existing.setDiscountAmount(dto.getDiscountAmount());
        existing.setValidFrom(dto.getValidFrom());
        existing.setValidTo(dto.getValidTo());
        existing.setApplicableFor(dto.getApplicableFor());
        return promotionsRepository.save(existing);
    }

    @Override
    public void deletePromotion(int id) {
        PromotionsEntity promo = promotionsRepository.findById(id)
                .orElseThrow(() -> new PromotionNotFoundException("Promotion with ID " + id + " not found"));
        promotionsRepository.delete(promo);
    }
         
    
    @Override
    public List<PromotionsEntity> getPromotionsByType(String type) {
        return promotionsRepository.findByApplicableFor(type);
    }

    @Override
    public PromotionsEntity getPromotionById(int id) {
       return promotionsRepository.findById(id)
               .orElseThrow(() -> new PromotionNotFoundException("Promotion with ID " + id + " not found"));
    }    
    
}
 