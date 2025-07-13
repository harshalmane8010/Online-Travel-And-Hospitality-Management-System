package cts.payment.service;

import cts.payment.entity.Payment;
//import cts.payment.feign.BookingFeignClient;
import cts.payment.model.BookingDto;
import cts.payment.model.PaymentDto;
import cts.payment.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
  //  private BookingFeignClient bookingFeignClient;

    @Override
    public Payment createPayment(PaymentDto paymentDto) {
        // Fetch booking details using FeignClient
       // BookingDto booking = bookingFeignClient.getBookingById(paymentDto.getBookingId());

        // Optional: Validate booking status or type before proceeding
//        if (booking == null || !"Confirmed".equalsIgnoreCase(booking.getStatus())) {
//            throw new IllegalArgumentException("Booking is not confirmed or does not exist.");
//        }

        // Create and save payment
        Payment payment = Payment.builder()
                .userId(paymentDto.getUserId())
                //.bookingId(paymentDto.getBookingId())
                .totalAmount(paymentDto.getTotalAmount())
                .status(paymentDto.getStatus())
                .paymentMethod(paymentDto.getPaymentMethod())
                .build();

        return paymentRepository.save(payment);
    }

    @Override
    public Optional<Payment> getPaymentById(Long id) {
        return paymentRepository.findById(id);
    }

    @Override
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    @Override
    public void deletePayment(Long id) {
        paymentRepository.deleteById(id);
    }
}
