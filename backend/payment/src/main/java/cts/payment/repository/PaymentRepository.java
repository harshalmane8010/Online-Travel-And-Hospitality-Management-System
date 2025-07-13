package cts.payment.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import cts.payment.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
	
}
