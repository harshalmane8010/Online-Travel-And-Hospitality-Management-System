package com.cts.ops.service;

import com.cts.ops.entity.PromotionsEntity;
import com.cts.ops.model.PromotionsDto;
import java.util.List;

public interface PromotionsService {
   
	List<PromotionsEntity> getAllPromotions();
    List<PromotionsEntity> getPromotionsByType(String type);
    PromotionsEntity createPromotion(PromotionsDto dto);
    PromotionsEntity getPromotionById(int id);
    PromotionsEntity updatePromotion(int id, PromotionsDto dto);
    void deletePromotion(int id);
    
}