package cts.payment.controller;

import cts.payment.entity.Payment;
import cts.payment.model.PaymentDto;
import cts.payment.service.PaymentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PaymentControllerTest {

    @Mock
    private PaymentService paymentService;

    @InjectMocks
    private PaymentController paymentController;

    private Payment payment;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        payment = new Payment();
        payment.setPaymentId(1L);
        payment.setUserId(101L);
        payment.setTotalAmount(2500.0);
        payment.setStatus("SUCCESS");
        payment.setPaymentMethod("CREDIT_CARD");
    }

    @Test
    void testCreatePayment() {
        PaymentDto paymentDto = new PaymentDto();
        paymentDto.setUserId(101L);
        paymentDto.setTotalAmount(2500.0);
        paymentDto.setStatus("SUCCESS");
        paymentDto.setPaymentMethod("CREDIT_CARD");

        when(paymentService.createPayment(any(PaymentDto.class))).thenReturn(payment);

        ResponseEntity<Payment> response = paymentController.createPayment(paymentDto);

        assertEquals(201, response.getStatusCodeValue());
        assertEquals(101L, response.getBody().getUserId());
    }

    @Test
    void testGetPaymentById() {
        when(paymentService.getPaymentById(1L)).thenReturn(Optional.of(payment));

        ResponseEntity<Payment> response = paymentController.getPaymentById(1L);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("SUCCESS", response.getBody().getStatus());
    }

    @Test
    void testGetAllPayments() {
        when(paymentService.getAllPayments()).thenReturn(Arrays.asList(payment));

        ResponseEntity<List<Payment>> response = paymentController.getAllPayments();

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(1, response.getBody().size());
    }

    @Test
    void testDeletePayment() {
        doNothing().when(paymentService).deletePayment(1L);

        ResponseEntity<Void> response = paymentController.deletePayment(1L);

        assertEquals(204, response.getStatusCodeValue());
        verify(paymentService, times(1)).deletePayment(1L);
    }
}
