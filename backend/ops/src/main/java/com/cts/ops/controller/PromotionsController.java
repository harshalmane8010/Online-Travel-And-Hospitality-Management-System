package com.cts.ops.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cts.ops.entity.PromotionsEntity;
import com.cts.ops.model.PromotionsDto;
import com.cts.ops.service.PromotionsService;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/promotions")


public class PromotionsController {
    @Autowired
    private PromotionsService promotionsService;

    @GetMapping
    public List<PromotionsEntity> getAllPromotions() {
        return promotionsService.getAllPromotions();
    }

    @PostMapping
    public PromotionsEntity createPromotion(@Valid @RequestBody PromotionsDto dto) {
        return promotionsService.createPromotion(dto);
    }

    @GetMapping("/type/{type}")
    public List<PromotionsEntity> getPromotionsByType(@PathVariable String type) {
        return promotionsService.getPromotionsByType(type);

    }
    
    @PutMapping("/{id}")
    public PromotionsEntity updatePromotion(@PathVariable int id, @Valid @RequestBody PromotionsDto dto) {
       return promotionsService.updatePromotion(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePromotion(@PathVariable int id) {
       promotionsService.deletePromotion(id);
       return ResponseEntity.noContent().build();
    }    

}
 