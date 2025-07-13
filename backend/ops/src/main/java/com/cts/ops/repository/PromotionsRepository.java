package com.cts.ops.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cts.ops.entity.PromotionsEntity;

import java.util.List;

public interface PromotionsRepository extends JpaRepository<PromotionsEntity, Integer> {
   List<PromotionsEntity> findByApplicableFor(String applicableFor);
}