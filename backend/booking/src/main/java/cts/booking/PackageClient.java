package cts.booking;

import cts.booking.model.PackageDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "PACKAGE-SERVICE", url = "http://localhost:8088/api/packages")
public interface PackageClient {

    @GetMapping("/{id}")
    PackageDto getPackageById(@PathVariable("id") Long id);
}
