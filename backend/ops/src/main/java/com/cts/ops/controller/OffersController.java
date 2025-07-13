package com.cts.ops.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cts.ops.entity.OffersEntity;
import com.cts.ops.model.OffersDto;
import com.cts.ops.service.OffersService;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/offers")


public class OffersController {
    @Autowired
    private OffersService offersService;

    @GetMapping
    public List<OffersEntity> getAllOffers() {
        return offersService.getAllOffers();
    }
    
    @GetMapping("/active")
    public List<OffersEntity> getActiveOffers() {
        return offersService.getActiveOffers();
    }

    @GetMapping("/type/{type}")
    public List<OffersEntity> getOffersByType(@PathVariable String type) {
        return offersService.getOffersByType(type);
    }

    @PostMapping
    public OffersEntity createOffer(@Valid @RequestBody OffersDto dto) {
        return offersService.createOffer(dto);
    }
    
    @PutMapping("/{id}")
    public OffersEntity updateOffer(@PathVariable int id, @Valid @RequestBody OffersDto dto) {
        return offersService.updateOffer(id, dto);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOffer(@PathVariable int id) {
        offersService.deleteOffer(id);
        return ResponseEntity.noContent().build();

    }
     

}
 