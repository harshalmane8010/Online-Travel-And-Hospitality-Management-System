package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RouteConfig {
	@Autowired
	private AuthenticationFilter filter;

	@Bean
	RouteLocator routes(RouteLocatorBuilder builder) {
		return builder.routes()
				.route("USER-SERVICE",
						r -> r.path("/user-api/**").filters(f -> f.filter(filter)).uri("lb://USER-SERVICE"))
				.route("MECHANIC-SERVICE",
						r -> r.path("/flights/**").filters(f -> f.filter(filter)).uri("lb://FLIGHT-SERVICE"))
				.route("BOOKING-SERVICE",
						r -> r.path("/bookings/**").filters(f -> f.filter(filter)).uri("lb://BOOKING-SERVICE"))
				.route("HOTEL-SERVICE",
						r -> r.path("/hotels/**").filters(f -> f.filter(filter)).uri("lb://HOTEL-SERVICE"))
				.route("PACKAGE-SERVICE",
						r -> r.path("/api/packages/**").filters(f -> f.filter(filter)).uri("lb://PACKAGE-SERVICE"))
				.route("ITINERARY-SERVICE",
						r -> r.path("/api/itineraries/**").filters(f -> f.filter(filter)).uri("lb://ITINERARY-SERVICE"))
				.route("OFFER-SERVICE",
						r -> r.path("/api/promotions**").filters(f -> f.filter(filter)).uri("lb://OFFER-SERVICE"))
				.route("OFFER-SERVICE",
						r -> r.path("/api/offers**").filters(f -> f.filter(filter)).uri("lb://OFFER-SERVICE"))
				.route("INVOICE",
						r -> r.path("/api/invoices**").filters(f -> f.filter(filter)).uri("lb://INVOICE"))
				.route("payment",
						r -> r.path("/api/payments**").filters(f -> f.filter(filter)).uri("lb://payment"))
				.route("SUPPORT-SERVICE",
						r -> r.path("/api/support-tickets**").filters(f -> f.filter(filter)).uri("lb://SUPPORT-SERVICE"))
				.route("REVIEW-SERVICE",
						r -> r.path("/api/reviews**").filters(f -> f.filter(filter)).uri("lb://REVIEW-SERVICE"))
				
				
				.build();
	}

}
