package cts.invoice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cts.invoice.entity.Invoice;
import cts.invoice.exception.ResourceNotFoundException;
import cts.invoice.feign.BookingClient;
import cts.invoice.model.BookingDto;
import cts.invoice.model.InvoiceDto;
import cts.invoice.repository.InvoiceRepository;

@Service
public class InvoiceServiceImp implements InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private BookingClient bookingClient;

    @Override
    public Invoice createInvoice(InvoiceDto invoiceDto) {
        // Fetch booking details using FeignClient
        BookingDto booking = bookingClient.getBookingById(invoiceDto.getBookingId());

        // Optional: Validate booking or calculate amount based on booking type
        Double totalAmount = calculateAmount(booking);

        Invoice invoice = Invoice.builder()
                .bookingId(booking.getBookingId())
                .userId((long) booking.getUserId())
                .totalAmount(totalAmount)
                .build();

        return invoiceRepository.save(invoice);
    }

    private Double calculateAmount(BookingDto booking) {
        switch (booking.getType()) {
            case "Hotel":
                return booking.getRoomsBooked() * 1000.0;
            case "Flight":
                return 5000.0;
            case "TravelPackage":
                return 8000.0;
            default:
                return 0.0;
        }
    }

    @Override
    public Optional<Invoice> getInvoiceById(Long id) {
        return invoiceRepository.findById(id);
    }

    @Override
    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }

    @Override
    public void deleteInvoice(Long id) {
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not found with ID: " + id));
        invoiceRepository.deleteById(id);
    }
}
