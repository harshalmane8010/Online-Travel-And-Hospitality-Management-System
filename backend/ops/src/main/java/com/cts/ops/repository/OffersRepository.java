package com.cts.ops.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cts.ops.entity.OffersEntity;

import java.time.LocalDate;
import java.util.List;
public interface OffersRepository extends JpaRepository<OffersEntity, Integer> {
   List<OffersEntity> findByApplicableTo(String applicableTo);
   List<OffersEntity> findByStartDateBeforeAndEndDateAfter(LocalDate now1, LocalDate now2);
}
