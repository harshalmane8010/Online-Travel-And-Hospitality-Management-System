package com.cts.ops.appconfig;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class AppConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000", "http://localhost:4200", "http://localhost:5173")
                .allowedMethods("*")
                .allowedHeaders("*");
    }

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

}
 