package com.cts.package_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;


@SpringBootApplication
@EnableDiscoveryClient

@EnableFeignClients(basePackages = "com.cts.package_service.client")

public class PackageServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(PackageServiceApplication.class, args);
    }
}
