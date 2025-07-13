package cts.payment.service;

import cts.payment.model.PaymentDto;
import cts.payment.entity.Payment;

import java.util.List;
import java.util.Optional;

public interface PaymentService {

    Payment createPayment(PaymentDto paymentDto);
    Optional<Payment> getPaymentById(Long id);
    List<Payment> getAllPayments();
    void deletePayment(Long id);
}
