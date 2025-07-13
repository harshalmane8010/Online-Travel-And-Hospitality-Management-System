package cts.payment.controller;

import cts.payment.model.BookingDto;
import cts.payment.model.PaymentDto;
import cts.payment.entity.Payment;
import cts.payment.exception.ResourceNotFoundException;
import cts.payment.service.PaymentService;
//import cts.payment.feign.BookingFeignClient;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
//    private BookingFeignClient bookingFeignClient;

    @PostMapping
    public ResponseEntity<Payment> createPayment(@Valid @RequestBody PaymentDto paymentDto) {
        Payment createdPayment = paymentService.createPayment(paymentDto);
        return new ResponseEntity<>(createdPayment, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Payment> getPaymentById(@PathVariable Long id) {
        Payment payment = paymentService.getPaymentById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found with ID: " + id));
        return ResponseEntity.ok(payment);
    }

    @GetMapping
    public ResponseEntity<List<Payment>> getAllPayments() {
        return ResponseEntity.ok(paymentService.getAllPayments());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePayment(@PathVariable Long id) {
        paymentService.deletePayment(id);
        return ResponseEntity.noContent().build();
    }

    // ✅ New endpoint to fetch booking details using FeignClient
//    @GetMapping("/bookings/{bookingId}")
//    public ResponseEntity<BookingDto> getBookingDetails(@PathVariable Long bookingId) {
//        BookingDto bookingDto = bookingFeignClient.getBookingById(bookingId);
//        return ResponseEntity.ok(bookingDto);
//    }
}
