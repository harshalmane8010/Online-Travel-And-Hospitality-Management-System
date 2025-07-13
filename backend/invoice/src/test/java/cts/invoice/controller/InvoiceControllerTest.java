package cts.invoice.controller;

import cts.invoice.entity.Invoice;
import cts.invoice.model.InvoiceDto;
import cts.invoice.service.InvoiceService;
import cts.invoice.exception.ResourceNotFoundException;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.Mockito.*;

class InvoiceControllerTest {

    @Mock
    private InvoiceService invoiceService;

    @InjectMocks
    private InvoiceController invoiceController;

    private InvoiceDto invoiceDto;
    private Invoice invoice;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        invoiceDto = InvoiceDto.builder()
                .bookingId(101L)
                .userId(202L)
                .totalAmount(1500.0)
                .timestamp(LocalDateTime.now())
                .build();

        invoice = Invoice.builder()
                .invoiceId(1L)
                .bookingId(invoiceDto.getBookingId())
                .userId(invoiceDto.getUserId())
                .totalAmount(invoiceDto.getTotalAmount())
                .timestamp(invoiceDto.getTimestamp())
                .build();
    }

    @Test
    void testCreateInvoice() {
        when(invoiceService.createInvoice(invoiceDto)).thenReturn(invoice);

        ResponseEntity<Invoice> response = invoiceController.createInvoice(invoiceDto);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(response.getBody()).isEqualTo(invoice);
    }

    @Test
    void testGetInvoiceById() {
        when(invoiceService.getInvoiceById(1L)).thenReturn(Optional.of(invoice));

        ResponseEntity<Invoice> response = invoiceController.getInvoiceById(1L);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo(invoice);
    }

    @Test
    void testGetInvoiceById_NotFound() {
        when(invoiceService.getInvoiceById(99L)).thenReturn(Optional.empty());

        try {
            invoiceController.getInvoiceById(99L);
            fail("Expected ResourceNotFoundException");
        } catch (ResourceNotFoundException ex) {
            assertThat(ex.getMessage()).isEqualTo("Invoice not found with ID: 99");
        }
    }

    @Test
    void testGetAllInvoices() {
        when(invoiceService.getAllInvoices()).thenReturn(List.of(invoice));

        ResponseEntity<List<Invoice>> response = invoiceController.getAllInvoices();

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).containsExactly(invoice);
    }

    @Test
    void testDeleteInvoice() {
        doNothing().when(invoiceService).deleteInvoice(1L);

        ResponseEntity<Void> response = invoiceController.deleteInvoice(1L);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
        verify(invoiceService, times(1)).deleteInvoice(1L);
    }
}
