package com.cts.package_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.cts.package_service.entity.Package;

@Repository
public interface PackageRepository extends JpaRepository<Package, Long>{

}
