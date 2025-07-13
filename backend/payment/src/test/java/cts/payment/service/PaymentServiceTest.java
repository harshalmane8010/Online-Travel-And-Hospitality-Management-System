package cts.payment.service;

import cts.payment.entity.Payment;
import cts.payment.exception.ResourceNotFoundException;
import cts.payment.model.PaymentDto;
import cts.payment.repository.PaymentRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PaymentServiceTest {

    @Mock
    private PaymentRepository paymentRepository;

    @InjectMocks
    private PaymentServiceImpl paymentService;

    private PaymentDto paymentDto;
    private Payment payment;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        paymentDto = PaymentDto.builder()
                .bookingId(101L)
                .userId(202L)
                .totalAmount(2500.0)
                .status("SUCCESS")
                .paymentMethod("CREDIT_CARD")
                .build();

        payment = Payment.builder()
                .paymentId(1L)
                .bookingId(paymentDto.getBookingId())
                .userId(paymentDto.getUserId())
                .totalAmount(paymentDto.getTotalAmount())
                .status(paymentDto.getStatus())
                .paymentMethod(paymentDto.getPaymentMethod())
                .build();
    }

    @Test
    void testCreatePayment() {
        when(paymentRepository.save(any(Payment.class))).thenReturn(payment);

        Payment result = paymentService.createPayment(paymentDto);

        assertNotNull(result);
        assertEquals(202L, result.getUserId());
        verify(paymentRepository, times(1)).save(any(Payment.class));
    }

    @Test
    void testGetPaymentById_Found() {
        when(paymentRepository.findById(1L)).thenReturn(Optional.of(payment));

        Optional<Payment> result = paymentService.getPaymentById(1L);

        assertTrue(result.isPresent());
        assertEquals(1L, result.get().getPaymentId());
    }

    @Test
    void testGetPaymentById_NotFound() {
        when(paymentRepository.findById(99L)).thenReturn(Optional.empty());

        Optional<Payment> result = paymentService.getPaymentById(99L);

        assertFalse(result.isPresent());
    }

    @Test
    void testGetAllPayments() {
        when(paymentRepository.findAll()).thenReturn(List.of(payment));

        List<Payment> result = paymentService.getAllPayments();

        assertEquals(1, result.size());
        assertEquals(202L, result.get(0).getUserId());
    }

    @Test
    void testDeletePayment_Success() {
        when(paymentRepository.existsById(1L)).thenReturn(true);
        doNothing().when(paymentRepository).deleteById(1L);

        assertDoesNotThrow(() -> paymentService.deletePayment(1L));
        verify(paymentRepository, times(1)).deleteById(1L);
    }

    @Test
    void testDeletePayment_NotFound() {
        when(paymentRepository.existsById(99L)).thenReturn(false);

        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, () -> {
            paymentService.deletePayment(99L);
        });

        assertEquals("Payment not found with ID: 99", exception.getMessage());
    }
}
