package cts.invoice.controller;

import cts.invoice.model.BookingDto;
import cts.invoice.model.InvoiceDto;
import cts.invoice.entity.Invoice;
import cts.invoice.exception.ResourceNotFoundException;
import cts.invoice.feign.BookingClient;
import cts.invoice.service.InvoiceService;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/invoices")
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;
    
    @Autowired
    private BookingClient bookingClient;


    @PostMapping
    public ResponseEntity<Invoice> createInvoice(@Valid @RequestBody InvoiceDto invoiceDto) {
        Invoice createdInvoice = invoiceService.createInvoice(invoiceDto);
        return new ResponseEntity<>(createdInvoice, HttpStatus.CREATED);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Invoice> getInvoiceById(@PathVariable Long id) {
        Invoice invoice = invoiceService.getInvoiceById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not found with ID: " + id));
        return ResponseEntity.ok(invoice);
    }

    @GetMapping
    public ResponseEntity<List<Invoice>> getAllInvoices() {
        return ResponseEntity.ok(invoiceService.getAllInvoices());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInvoice(@PathVariable Long id) {
        invoiceService.deleteInvoice(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/{id}/bookings")
    public ResponseEntity<BookingDto> getBookingDetailsForInvoice(@PathVariable Long id) {
        Invoice invoice = invoiceService.getInvoiceById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not found with ID: " + id));

        BookingDto booking = bookingClient.getBookingById(invoice.getBookingId());
        return ResponseEntity.ok(booking);
    }

    
}
